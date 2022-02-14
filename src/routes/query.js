const express = require("express");
const {Query, validateQuery} = require("../models/Query");
const router = express.Router();

const validateMiddleware = require("../middlewares/validateMiddleware")

import { verifyToken } from "../controllers/verifyToken";

/**
 * @swagger
 * /query:
 *   get:
 *     summary: GET Queries
 *     tags:
 *       - Query
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
 *                 $ref: '#/components/schemas/Query' 
 * tags:
 *   - name: Auth
 *     description: Routes to access the authentication
 *   - name: Article
 *     description: Access to Articles
 *   - name: Like
 *     description: Access to Likes
 *   - name: Query
 *     description: Access to Queries
 *   - name: Comment
 *     description: Access to Comments
 * components:
 *   schemas:
 *     Query:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Gafuku Ramos
 *         mail:
 *           type: string
 *           description: The user's email.
 *           example: gafuku@gmail.com
 *         subject:
 *           type: string
 *           description: the query subject.
 *           example: Just want to reach out
 *         message:
 *           type: string
 *           description: The user's message in the query.
 *           example: i want to link up and talk about gafuku family
 */

router.get("/", verifyToken ,async (req,res)=>{
    try {
    const queries = await  Query.find();
    const user = req.user;
         res.status(200).send(queries);
    } catch (error) {
        res.status(404).send({Message: "Problem getting articles"})
    }
})

/** 
* @swagger
* /query:
*   post:
*     summary: Add New Query
*     tags:
*       - Query
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Query' 
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

router.post("/", validateMiddleware(validateQuery) ,async (req,res) =>{
   try {
    const newQuery = new Query({
        name : req.body.username,
        email : req.body.email,
        message: req.body.message,
        subject: req.body.subject,
        })

    await newQuery.save();
    res.status(201).send({"Message":"New Query submitted successfully"})     
   } catch (error){
       console.log(req.body)
       res.status(400).send({error:"There was a problem submitting the query"})
   }
})

module.exports = router;