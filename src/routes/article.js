const express = require("express");
const {validateArticle, Article } = require("../models/Article");
const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";
import validateMiddleware from "../middlewares/validateMiddleware";

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /article:
 *   get:
 *     summary: GET Articles
 *     tags:
 *       - Article
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '200':
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article' 
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         heading:
 *           type: string
 *           description: heading of the article
 *           example: Manchester United boss Ralf Rangnick believes club getting better
 *         content: 
 *           type: string
 *           description: Detailed contents of the article
 *           example: The Old Trafford defeat by Chris Wilder's Championship side ended any realistic hope of United winning their first domestic silverware since 2017.
 *         image:
 *           type: string
 *           description: The image in the article.
 *           example: smilingcat.png
 */


router.get("/",  async(req,res)=>{
    try {
        const articles = await Article.find({});
        res.status(200).send(articles);
    } catch (error){
        res.status(500).send({error:"Problem with request"})
    }

})

router.get("/:id", async (req,res) =>{
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

/** 
* @swagger
* /article:
*   post:
*     summary: Add New Article
*     tags:
*       - Article
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Article' 
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Query added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/

router.post("/",verifyToken, validateMiddleware(validateArticle), async (req,res) =>{
   // console.log(req.body)
   try {

    const newArticle =await new Article({
        heading : req.body.heading,
        content : req.body.content,
        userId: req.user["id"],
        image : req.body.image,
        })
       // console.log(req.user["id"])
     await newArticle.save();

     res.status(201).send({Message:"New Article Created"})     
   } catch (error){
       res.status(400).send({error:"There was a problem publishing the article"})
    //    console.log(error)
   }
})

/**
 * @swagger
 * "/article/{articleId}":
 *   delete:
 *     summary: Delete article according to ID
 *     tags: 
 *       - Article
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       "404":
 *         description: Article not found
 */

router.delete("/:id", verifyToken, async (req, res) => {
	try {
		await Article.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404).send({ error: "This article doesn't exist!" })
	}
})

/**
 * @swagger
 * "/article/{articleId}":
 *   get:
 *     summary: Find article by ID
 *     tags: 
 *       - Article
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       "404":
 *         description: Article not found
 */

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