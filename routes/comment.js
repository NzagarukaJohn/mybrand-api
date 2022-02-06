const express = require("express");
const {validateComment,Comment } = require("../models/Comment");
const {Article } = require("../models/Like");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";



router.get("/",  async(req,res)=>{
    try {
        const comments = await Comment.find({});
        res.send(comments);
    } catch (error){
        // console.log(error)
        res.sendStatus(500);
    }

})

router.get("/:id", async (req,res) =>{
    try {
        const comments = await Like.find({})
    
        res.send({comments: comments.length})   
    } catch(error)  {
        console.error(error);
        res.sendStatus(404);
    }

})

router.post("/",verifyToken,validateMiddleWare(validateComment) , async (req,res) =>{
   try {

    const newComment = new Comment({
        articleId : req.body.articleId,
        comment:req.body.comment,
        userId : req.user["id"]
        })

        await newComment.save();
    res.sendStatus(201).send("")     
   } catch (error){
       res.sendStatus(400);
     console.log(error)
     console.log(req.user)
    //  console.log(req.user["user"]["_id"])
   }
})


router.delete("/:id", verifyToken,validateMiddleWare(validateComment), async (req, res) => {
	try {
		await Like.deleteOne({ articleId: req.params.id , userId:req.user["user"]["_id"]})
		res.sendStatus(204);
	} catch {
		res.status(404)
		res.send({ error: "Problem disliking" })
	}
})

module.exports = router;