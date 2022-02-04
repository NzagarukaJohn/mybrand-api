const mongoose = require("mongoose");
const Joi = require('@hapi/joi')


 const schema = new mongoose.Schema({
     heading:{type:String, required:true},
     content:{type: String , required: true},
     image:{type: String, required: true},
     userId:{type:String,required:true},
     date:{type:Date, default: Date.now},
 },{
     versionKey:false
 })


const Article = mongoose.model("Article",schema);

const validateArticle = (article) => {
  const schema = Joi.object({
      heading:Joi.string().min(20).max(200).required(),
      content:Joi.string().min(30).max(1000).required(),
      image: Joi.string(),
  })

  return schema.validate(article)
}

module.exports = {
  Article,
  validateArticle,
}