const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const {validateUser} = require("./models/User");
const validatorMethod = require("./validatorMethod");
const bcrypt = require("bcrypt")

const secret = 'john';
router.post("/", validatorMethod(validateUser), async(req,res)=>{
    // await User.deleteMany({})
   try {
       
    const user = {
        username:"Nzagaruka John",
        password: "Nzagaruka"
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

       if(await bcrypt.compare(req.body.password, hashedPassword)){
     
     const payload = {username:user.username};

        jwt.sign(payload,secret,(err,token)=>{
            res.status(200).send({"token": token})
        })
      }else{
         res.status(400).send("Password Incorrect");
      }
   } catch (err) {
       //console.log(err)
       res.sendStatus(405);
   }

})

module.exports = router;