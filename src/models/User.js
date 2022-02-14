const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

 const schema = new mongoose.Schema({
     email:{type:String, required:true},
     password:{type: String , required: true},
     type:{type:String, default: "user"},

 },{
     versionKey:false
 })

const User = mongoose.model("User",schema);

 const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(500).required(),
        password: Joi.string().min(8).max(1024).required(),
  
    })
    return schema.validate(user)
  }
  
  module.exports = {
    User,
    validateUser,
  }