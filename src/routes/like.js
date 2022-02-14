const express = require("express");
const {validateLike,Like } = require("../models/Like");
const {validateDislike,Dislike } = require("../models/Dislike");
const {Article } = require("../models/Like");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import e from "express";
import { verifyToken } from "../controllers/verifyToken";

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /like:
 *   get:
 *     summary: GET Likes
 *     tags:
 *       - Like
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '401':
 *         description: Unauthorized
 *       '200':
 *         description: A list of likes on articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     articleId: string
 *                     description: The Id of the article with like.
 *                   userId:
 *                     type: string
 *                     description: The Id of the user who gave the like
 */

router.get("/",  async(req,res)=>{
    try {
        const likes = await Like.find({});
        res.status(200).send(likes);
    } catch (error){
        res.status(500).send({error:"Problem fetching likes"})
      //  console.log(error)
    }

})

/**
 * @swagger
 * "like/article/{articleId}":
 *   get:
 *     summary: Find likes for one article
 *     tags: 
 *       - Like
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description:  Not found
  */

router.get("article/:id", async (req,res) =>{
    try {
        const likes = await Like.find({articleId:req.params.id})
    
        res.status(200).send({likes: likes.length})   
    } catch(error)  {
        // console.error(error);
        res.status(404).send({Message:"No like for this particular article"});
    }

})

router.get("/:id", async (req,res) =>{
    try {
        const like = await Like.find({_id:req.params.id})
    
        res.status(200).send({like: like})   
    } catch(error)  {
        // console.error(error);
        res.status(404).send({Message:"No like for this particular article"});
    }

})

/** 
* @swagger
* /like:
*   post:
*     summary: Add New Like
*     tags:
*       - Like
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 articleId:
*                   type: string
*                   description: The id of the article to like
*                  
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Like added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/

router.post("/",verifyToken,validateMiddleWare(validateLike) , async (req,res) =>{
   try {
   let likeExists = Like.findOne({articleId:req.body.articleId, userId: req.user["id"]});
   let dislikeExists = Dislike.findOne({articleId:req.body.articleId, userId: req.user["id"]});

   //check if user has disliked article and remove dislike
   if (dislikeExists) {
    await Dislike.deleteOne({ articleId: req.params.id , userId:req.user["id"]})
    }
   //Add New like if a user have previously liked the article
    if (!likeExists) {
        const newLike = new Like({
            articleId : req.body.articleId,
            userId : req.user["id"]
            })
    
            await newLike.save();
        res.status(201).send({Message:"Like added successfully"})    
    } else {
        res.status(400).send({Message: "User already liked the article"})
    }
     
   } catch (error){
       res.sendStatus(500).send({error:"There was a problem adding a like"})
    // console.log(error)
   }
})


/**
 * @swagger
 * "/like/{articleId}":
 *   delete:
 *     summary: Dislike an article
 *     tags: 
 *       - Like
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Article disliked successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
 */

router.delete("/:id", verifyToken,validateMiddleWare(validateLike), async (req, res) => {
	try {
        //ch if a user has previously liked the article
        let likeExists = Like.findOne({articleId:req.body.articleId, userId: req.user["id"]});
         if (likeExists) {
            await Like.deleteOne({ articleId: req.params.id , userId:req.user["id"]})
         }
         let dislikeExists = Dislike.findOne({articleId:req.body.articleId, userId: req.user["id"]});

         //check if user has disliked article and remove dislike
         if (dislikeExists) {
          await Dislike.deleteOne({ articleId: req.params.id , userId:req.user["id"]})
          }else{
            const newDislike = new Dislike({
                articleId : req.body.articleId,
                userId : req.user["id"]
                })
        
                await newDislike.save();

            res.status(201).send({Message:"you have dislike this article"}) 
            }
	} catch {
		res.status(500).send({ error: "Problem disliking" })
	}
})

module.exports = router;