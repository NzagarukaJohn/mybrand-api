const mongoose = require("mongoose");
const Joi = require("@hapi/joi")
const schema = mongoose.Schema({
  title: String,
  content: String,
  user: String

});

const Post = mongoose.model("Post", schema);


const validatePost = (post) =>{
  const schema = Joi.object({
     title: Joi.string().min(8).max(80).required(),
     content: Joi.string().min(18).max(800).required(),
  })

  return schema.validate(post);
}

module.exports = {
  Post,
  validatePost,
}