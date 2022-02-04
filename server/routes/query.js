const express = require("express");
const {Query, validateQuery} = require("../models/Query");
const router = express.Router();

const validateMiddleware = require("../middlewares/validateMiddleware")

import { verifyToken } from "../controllers/verifyToken";


router.get("/", verifyToken ,async (req,res)=>{
    const queries =await  Query.find();
    const user = req.user;
     if(user["user"].type == "admin"){
          res.send(queries);
     }
    else{
        res.sendStatus(401);
    }
})


router.post("/", validateMiddleware(validateQuery) ,async (req,res) =>{
   try {
    const newQuery = new Query({
        name : req.body.username,
        email : req.body.email,
        message: req.body.message,
        subject: req.body.subject,
        })

    await newQuery.save();
    res.status(201).send({"Message":"New Query submitted successfully"})     
   } catch (error){
       console.log(req.body)
       res.status(400).send({error:"There was a problem submitting the query"})
   }
})

module.exports = router;