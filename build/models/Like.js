"use strict";

var mongoose = require("mongoose");

var Joi = require('@hapi/joi');

var schema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
var Like = mongoose.model("Like", schema);

var validateLike = function validateLike(like) {
  var schema = Joi.object({
    articleId: Joi.string().required()
  });
  return schema.validate(like);
};

module.exports = {
  Like: Like,
  validateLike: validateLike
};
//# sourceMappingURL=Like.js.map