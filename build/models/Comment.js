"use strict";

var mongoose = require("mongoose");

var Joi = require('@hapi/joi');

var schema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true
  },
  comment: {
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
var Comment = mongoose.model("Comment", schema);

var validateComment = function validateComment(comment) {
  var schema = Joi.object({
    articleId: Joi.string().required(),
    comment: Joi.string().min(3).max(400)
  });
  return schema.validate(comment);
};

module.exports = {
  Comment: Comment,
  validateComment: validateComment
};
//# sourceMappingURL=Comment.js.map