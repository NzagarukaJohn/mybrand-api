const express = require("express");
const {validateLike,Like } = require("../models/Like");
const {Article } = require("../models/Like");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

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