"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var jwt = require("jsonwebtoken");

var config = require("config"); // Verify Token


function verifyToken(req, res, next) {
  var bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1]; // console.log(bearerToken)

    jwt.verify(bearerToken, config.secret, function (err, user) {
      // console.log(err)
      if (err) return res.sendStatus(401);
      req.user = user;
    });
    next();
  } else {
    console.log(bearerHeader);
    res.sendStatus(401);
  }
}
//# sourceMappingURL=verifyToken.js.map