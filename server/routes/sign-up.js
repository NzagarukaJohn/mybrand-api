const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")

const {validateUser,User} = require("../models/User")
const validateMiddleWare = require('../middlewares/validateMiddleware')

router.get("/",(req,res)=>{
    res.send({Message:"This is the sign up page"})
})

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register new user
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
 *                 token:
 *                   type: string
 *                   description: A secure token for authentication
 *                 
 */

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
    res.status(201).send({Message:"User registered Successfully"})
} catch (error) {
    // console.log(error)
    res.status(500).send();
}

})

module.exports = router;