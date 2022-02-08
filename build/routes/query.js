"use strict";

var _verifyToken = require("../controllers/verifyToken");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var _require = require("../models/Query"),
    Query = _require.Query,
    validateQuery = _require.validateQuery;

var router = express.Router();

var validateMiddleware = require("../middlewares/validateMiddleware");

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /query:
 *   get:
 *     summary: GET Queries
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '200':
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: Gafuku Ramos
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: gafuku@gmail.com
 *                   subject:
 *                     type: string
 *                     description: the query subject.
 *                     example: Just want to reach out
 *                   message:
 *                     type: string
 *                     description: The user's message in the query.
 *                     example: i want to link up and talk about gafuku family
 * components:
 *   securitySchemes:
 *     bearerAuth:           
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get("/", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var queries, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Query.find();

          case 2:
            queries = _context.sent;
            user = req.user; //  if(user["user"].type == "user"){

            res.status(200).send(queries); //  }
            // else{
            //     res.sendStatus(401);
            // }

          case 5:
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
router.post("/", validateMiddleware(validateQuery), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var newQuery;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newQuery = new Query({
              name: req.body.username,
              email: req.body.email,
              message: req.body.message,
              subject: req.body.subject
            });
            _context2.next = 4;
            return newQuery.save();

          case 4:
            res.status(201).send({
              "Message": "New Query submitted successfully"
            });
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(req.body);
            res.status(400).send({
              error: "There was a problem submitting the query"
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=query.js.map