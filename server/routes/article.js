const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

router.get("/", async(req,res)=>{
    try {
        const queries = await Article.find();
        res.status(200).send(queries);
    } catch {
        res.status(500).send({error:"Problem with request"})
    }

})

router.get("/:id", async (req,res) =>{
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

router.post("/", async (req,res) =>{
   try {

    const newArticle = new Article({
        heading : req.body.heading,
        content : req.body.content,

        })

    await newArticle.save();
    res.status(200).send("New Article submitted successfully")     
   } catch (error){
       res.status(400).send({error:"There was a problem publishing the article"})
       console.log(error)
   }
})


router.delete("/:id", async (req, res) => {
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