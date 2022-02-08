"use strict";

var mongoose = require("mongoose");

var Joi = require('@hapi/joi');

var schema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
}, {
  versionKey: false
});
var Article = mongoose.model("Article", schema);

var validateArticle = function validateArticle(article) {
  var schema = Joi.object({
    heading: Joi.string().min(20).max(200).required(),
    content: Joi.string().min(30).max(1000).required(),
    image: Joi.string()
  });
  return schema.validate(article);
};

module.exports = {
  Article: Article,
  validateArticle: validateArticle
};
//# sourceMappingURL=Article.js.map