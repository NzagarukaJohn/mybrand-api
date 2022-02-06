const express = require("express");
const {validateArticle, Article } = require("../models/Article");
const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";
import validateMiddleware from "../middlewares/validateMiddleware";



router.get("/", verifyToken,  async(req,res)=>{
    try {
        const articles = await Article.find({});
        res.status(200).send(articles);
    } catch (error){
        res.status(500).send({error:"Problem with request"})
    }

})

router.get("/:id", verifyToken, async (req,res) =>{
    try {
        const Article = await Article.findOne({
            _id: req.params.id
        })
    
        res.send(Article)   
    } catch  {
        res.status(404)
        res.send({error: "Article doesn't exist !"})
    }

})

router.post("/",verifyToken, validateMiddleware(validateArticle), async (req,res) =>{
   // console.log(req.body)
   try {

    const newArticle =await new Article({
        heading : req.body.heading,
        content : req.body.content,
        userId: req.user["id"],
        image : req.body.image,
        })
        console.log(req.user["id"])
     await newArticle.save();

     res.status(201).send({Message:"New Article Created"})     
   } catch (error){
       res.status(400).send({error:"There was a problem publishing the article"})
    //    console.log(error)
   }
})


router.delete("/:id", verifyToken, async (req, res) => {
	try {
		await Article.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404).send({ error: "This article doesn't exist!" })
	}
})

router.put("/:id", validateMiddleWare(validateArticle) ,async (req, res) => {
	try {
		const Article = await Article.findOne({ _id: req.params.id })

		if (req.body.heading) {
			Article.heading = req.body.heading
		}

		if (req.body.content) {
			Article.content = req.body.content
		}
		if (req.body.image) {
			Article.content = req.body.content
		}
		await Article.save()
		res.send(Article)
	} catch {
		res.status(404)
		res.send({ error: "Article doesn't exist!" })
	}
})


module.exports = router;