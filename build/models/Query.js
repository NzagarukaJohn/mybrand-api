"use strict";

var mongoose = require("mongoose");

var Joi = require("@hapi/joi");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
var Query = mongoose.model("Query", schema);

var validateQuery = function validateQuery(query) {
  var schema = Joi.object({
    username: Joi.string().min(5).max(500).required(),
    email: Joi.string().email().min(5).max(1024).required(),
    subject: Joi.string().min(10).max(500).required(),
    message: Joi.string().min(10).max(500).required()
  });
  return schema.validate(query);
};

module.exports = {
  Query: Query,
  validateQuery: validateQuery
};
//# sourceMappingURL=Query.js.map