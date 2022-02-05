const express = require("express");
const {validateLike,Like } = require("../models/Like");
const {Article } = require("../models/Like");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";

router.get("/",  async(req,res)=>{
    try {
        const likes = await Like.find({});
        res.status(200).send(likes);
    } catch (error){
        res.sendStatus(500).send({error:"Problem with request"})
        console.log(error)

    }

})

router.get("/:id", async (req,res) =>{
    try {
        const likes = await Like.find({articleId:req.params.id})
    
        res.send({likes: likes.length})   
    } catch(error)  {
        console.error(error);
        res.sendStatus(404);
    }

})

router.post("/",verifyToken,validateMiddleWare(validateLike) , async (req,res) =>{
   try {

    const newLike = new Like({
        articleId : req.body.articleId,
        userId : req.user["id"]
        })

        await newLike.save();
    res.sendStatus(201).send("")     
   } catch (error){
       res.sendStatus(400).send({error:"There was a problem adding a like"})
    // console.log(error)
   }
})


router.delete("/:id", verifyToken,validateMiddleWare(validateLike), async (req, res) => {
	try {
		await Like.deleteOne({ articleId: req.params.id , userId:req.user["user"]["_id"]})
		res.sendStatus(204);
	} catch {
		res.status(404)
		res.send({ error: "Problem disliking" })
	}
})

module.exports = router;