const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const {User,validateUser} = require("../models/User")
const bcrypt = require("bcrypt")
const config = require("config");

router.get("/",async (req,res)=>{
    const users = await User.find()

    res.send(users)
})

router.post("/",async(req,res)=>{
    // await User.deleteMany({})
   const user = await User.findOne({username: req.body.username})
  
   if (user == null) {
       return res.status(400).send("Cannot Find User")
   }
   try {
      if(await bcrypt.compare(req.body.password, user.password)){
     
     const payload = {id:user._id,username:user.username,type:user.type};
        jwt.sign(payload,config.secret,(err,token)=>{
            res.status(200).send({"token": token})
        })
      }else{
         res.status(400).send("Password Incorrect");
      }
   } catch (err) {
       res.sendStatus(405);
   }
  const accessTokenSecret = require("crypto").randomBytes(64).toString("hex");

})

module.exports = router;