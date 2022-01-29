const mongoose = require("mongoose");
// const newArticle = {
//     articleId:`${generateId()}`,
//     heading :articleHeading,
//     content : articleContent,
//     date: new Date().toLocaleDateString(),
//     image:articleImage,
//     userId:userId
//  }

 const schema = new mongoose.Schema({
     heading:{type:String, required:true},
     content:{type: String , required: true},
     date:{type:Date, default: Date.now},

 },{
     versionKey:false
 })


module.exports = mongoose.model("Article",schema);