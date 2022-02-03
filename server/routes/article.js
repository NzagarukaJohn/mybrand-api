const express = require("express");
const {validateArticle,Article } = require("../models/Article");
const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";

router.get("/", verifyToken,  async(req,res)=>{
    try {
        const queries = await Article.find();
        res.status(200).send(queries);
    } catch (error){
        res.status(500).send({error:"Problem with request"})
    }

})

router.get("/:id", verifyToken, async (req,res) =>{
    try {
        const post = await Article.findOne({
            _id: req.params.id
        })
    
        res.send(post)   
    } catch  {
        res.status(404)
        res.send({error: "Article doesn't exist !"})
    }

})

router.post("/",verifyToken,validateMiddleWare(validateArticle) , async (req,res) =>{
   try {

    const newArticle = new Article({
        heading : req.body.heading,
        content : req.body.content,
        user_id : req.user["user"]["_id"]
        })

         await newArticle.save();
    res.status(200).send("New Article submitted successfully")     
   } catch (error){
       res.status(400).send({error:"There was a problem publishing the article"})
    //  console.log(error)
   }
})


router.delete("/:id", verifyToken, async (req, res) => {
	try {
		await Article.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "This article doesn't exist!" })
	}
})

router.put("/:id", async (req, res) => {
	try {
		const post = await Article.findOne({ _id: req.params.id })

		if (req.body.heading) {
			post.heading = req.body.heading
		}

		if (req.body.content) {
			post.content = req.body.content
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})


module.exports = router;