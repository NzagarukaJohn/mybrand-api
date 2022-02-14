const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const {User,validateUser} = require("../models/User")
const bcrypt = require("bcrypt")
const config = require("config");



router.get("/",async (req,res)=>{
   // const users = await User.find()
   try {
    res.status.send({Message: "This should be the login page rendered"})       
   } catch (error) {
       res.status(404).send("Login resource not found")
   }
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to get token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string  
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '200':
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                 
 */

router.post("/",async(req,res)=>{
   const user = await User.findOne({email: req.body.email})
  
   if (user == null) {
       return res.status(400).send({"Message":"Cannot Find User"})
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
       console.log(err)
       res.status(405).send({Message: "Problem with the server"});
   }

})

module.exports = router;