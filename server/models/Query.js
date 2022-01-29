const mongoose = require("mongoose");

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

module.exports = mongoose.model("Query",schema);