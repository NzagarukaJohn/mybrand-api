const express = require("express");
const {validateComment,Comment } = require("../models/Comment");
const {Article } = require("../models/Article");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /comment:
 *   get:
 *     summary: GET Comments
 *     tags:
 *       - Comment
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '401':
 *         description: Unauthorized
 *       '200':
 *         description: A list of comments on articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     articleId: string
 *                     description: The Id of the article with comment.
 *                   userId:
 *                     type: string
 *                     description: The Id of the user who commented
 *                   comment:
 *                     type: string
 *                     description: comment contents
 */

router.get("/",  async(req,res)=>{
    try {
        const comments = await Comment.find({});
        res.status(200).send(comments);
    } catch (error){
        // console.log(error)
        res.status(500).send({Message: "Problem getting comments"});
    }

})


router.get("/:id", async (req,res) =>{
    try {
        const comments = await Comment.find({})
    
        res.send({comments: comments.length})   
    } catch(error)  {
        console.error(error);
        res.sendStatus(404).send("Comment not found");
    }
})

/** 
* @swagger
* /comment:
*   post:
*     summary: Add New Comment
*     tags:
*       - Comment
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Comment' 
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Comment added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
* components:
*   schemas:
*     Comment:
*       type: object
*       properties:
*         articleId:
*           type: string
*           description: Article Id to add the comment to
*           example: 9ad6beae833c2ea873
*         comment:
*           type: string
*           description: comment.
*           example: This swagger docs is great
*/

router.post("/",verifyToken,validateMiddleWare(validateComment) , async (req,res) =>{
   try {

    const newComment = new Comment({
        articleId : req.body.articleId,
        comment:req.body.comment,
        userId : req.user["id"]
        })

        await newComment.save();
    res.status(201).send({Message:"Comment added successfully"})     
   } catch (error){
       res.status(500).send({Message:"problem adding comment"});
    //  console.log(error)
    //  console.log(req.user["user"]["_id"])
   }
})


router.delete("/:id", verifyToken,validateMiddleWare(validateComment), async (req, res) => {
	try {
		await Comment.deleteOne({ articleId: req.params.id , userId:req.user["user"]["_id"]})
		res.sendStatus(204).send({Message: "Comment Deleted successfully"});
	} catch {
		res.status(500).send({ error: "Problem deleting a comment" })
	}
})

module.exports = router;