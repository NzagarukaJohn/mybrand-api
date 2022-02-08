"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var router = express.Router();

var jwt = require("jsonwebtoken");

var _require = require("../models/User"),
    User = _require.User,
    validateUser = _require.validateUser;

var bcrypt = require("bcrypt");

var config = require("config");

router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.find();

          case 2:
            users = _context.sent;
            res.send(users);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to get token
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
 *                 Message:
 *                   type: string
 *                 
 */

router.post("/", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, payload, accessTokenSecret;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              username: req.body.username
            });

          case 2:
            user = _context2.sent;

            if (!(user == null)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send("Cannot Find User"));

          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return bcrypt.compare(req.body.password, user.password);

          case 8:
            if (!_context2.sent) {
              _context2.next = 13;
              break;
            }

            payload = {
              id: user._id,
              username: user.username,
              type: user.type
            };
            jwt.sign(payload, config.secret, function (err, token) {
              res.status(200).send({
                "token": token
              });
            });
            _context2.next = 14;
            break;

          case 13:
            res.status(400).send("Password Incorrect");

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](5);
            res.sendStatus(405);

          case 19:
            accessTokenSecret = require("crypto").randomBytes(64).toString("hex");

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 16]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=login.js.map