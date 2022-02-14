const mongoose = require("mongoose");
const Joi = require('@hapi/joi')

 const schema = new mongoose.Schema({
     articleId:{type:String, required:true},
     userId:{type: String , required: true},     
 },{
     versionKey:false
 })


const Dislike = mongoose.model("Dislike",schema);

const validateDislike = (dislike) => {
  const schema = Joi.object({
      articleId:Joi.string().required(),
  })
  return schema.validate(dislike)
}

module.exports = {
  Dislike,
  validateDislike,
}