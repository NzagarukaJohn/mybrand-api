const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateUser = (user) =>{
    const schema= Joi.object({
        username:Joi.string().min(4).max(22).required(),
        password: Joi.string().required(),
    })

    return schema.validate(user);
}

module.exports = {
    validateUser
  }