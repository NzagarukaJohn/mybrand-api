const mongoose = require("mongoose");
const Joi = require('@hapi/joi')

 const schema = new mongoose.Schema({
     articleId:{type:String, required:true},
     comment:{type:String, required:true},
     userId:{type: String , required: true},     
 },{
     versionKey:false
 })


const Comment = mongoose.model("Comment",schema);

const validateComment = (comment) => {
  const schema = Joi.object({
      articleId:Joi.string().required(),
      comment:Joi.string().min(3).max(400),
  })
  return schema.validate(comment)
}

module.exports = {
  Comment,
  validateComment,
}