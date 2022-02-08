const mongoose = require("mongoose");
const Joi = require('@hapi/joi')

 const schema = new mongoose.Schema({
     articleId:{type:String, required:true},
     userId:{type: String , required: true},     
 },{
     versionKey:false
 })


const Like = mongoose.model("Like",schema);

const validateLike = (like) => {
  const schema = Joi.object({
      articleId:Joi.string().required(),
  })
  return schema.validate(like)
}

module.exports = {
  Like,
  validateLike,
}