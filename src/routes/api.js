const express = require("express");
const {validateLike,Like } = require("../models/Like");
const {Article } = require("../models/Like");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";



router.get("/",  async(req,res)=>{
    try {
        res.status(200).send("<h1> Welcome to my blog api </h1>");
    } catch (error){
        res.sendStatus(500).send({error:"Problem with request"})
    }
})


module.exports = router;