const mongoose = require("mongoose");
const Joi = require("@hapi/joi")

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    date: { type: Date, default: Date.now },
    subject:{type: String, required: true},
    message: {type: String, required: true},
}
,
  {
    versionKey: false
  }
)

const Query = mongoose.model("Query",schema);

const validateQuery = (query) => {
  const schema = Joi.object({
      username: Joi.string().min(5).max(500).required(),
      email: Joi.string().email().min(5).max(1024).required(),
      subject: Joi.string().min(10).max(500).required(),
      message: Joi.string().min(10).max(500).required(),
  })

  return schema.validate(query)
}

module.exports = {
  Query,
  validateQuery,
}