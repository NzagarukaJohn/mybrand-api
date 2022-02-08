"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var router = express.Router();

var bcrypt = require("bcrypt");

var _require = require("../models/User"),
    validateUser = _require.validateUser,
    User = _require.User;

var validateMiddleWare = require('../middlewares/validateMiddleware');

router.get("/", function (req, res) {
  res.send({
    Message: "This is the sign up page"
  });
});
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string  
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '200':
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A secure token for authentication
 *                 
 */

router.post("/", validateMiddleWare(validateUser), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userExist, salt, hashedPassword, user, users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.findOne({
              username: req.body.username
            });

          case 3:
            userExist = _context.sent;

            if (!userExist) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Username Already Taken"));

          case 6:
            _context.next = 8;
            return bcrypt.genSalt();

          case 8:
            salt = _context.sent;
            _context.next = 11;
            return bcrypt.hash(req.body.password, salt);

          case 11:
            hashedPassword = _context.sent;
            user = new User({
              username: req.body.username,
              password: hashedPassword,
              type: "user"
            });
            _context.next = 15;
            return user.save();

          case 15:
            _context.next = 17;
            return User.find();

          case 17:
            users = _context.sent;
            res.status(201).send({
              Message: "User registered Successfully"
            });
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            // console.log(error)
            res.status(500).send();

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=sign-up.js.map