"use strict";

// validateMiddleware
module.exports = function (validator) {
  return function (req, res, next) {
    var _validator = validator(req.body),
        error = _validator.error;

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    next();
  };
};
//# sourceMappingURL=validateMiddleware.js.map