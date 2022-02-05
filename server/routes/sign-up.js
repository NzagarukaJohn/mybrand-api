const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")

const {validateUser,User} = require("../models/User")
const validateMiddleWare = require('../middlewares/validateMiddleware')

router.get("/",(req,res)=>{
    res.send("kevin")
})
router.post("/", validateMiddleWare(validateUser), async(req,res)=>{
try {    
    const userExist = await User.findOne({username: req.body.username})
    if (userExist) return res.status(400).send("Username Already Taken")
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user= new User({
        username:req.body.username,
        password:hashedPassword,
        type: "user"
    })

     await user.save();
  const users = await User.find();
    res.status(201).send(users)
} catch (error) {
    // console.log(error)
    res.status(500).send();
}

})

module.exports = router;