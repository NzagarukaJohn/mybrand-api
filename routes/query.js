const express = require("express");
const {Query, validateQuery} = require("../models/Query");
const router = express.Router();

const validateMiddleware = require("../middlewares/validateMiddleware")

import { verifyToken } from "../controllers/verifyToken";

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /query:
 *   get:
 *     summary: GET Queries
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
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: Gafuku Ramos
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: gafuku@gmail.com
 *                   subject:
 *                     type: string
 *                     description: the query subject.
 *                     example: Just want to reach out
 *                   message:
 *                     type: string
 *                     description: The user's message in the query.
 *                     example: i want to link up and talk about gafuku family
 * components:
 *   securitySchemes:
 *     bearerAuth:           
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get("/", verifyToken ,async (req,res)=>{
    const queries = await  Query.find();
    const user = req.user;
    //  if(user["user"].type == "user"){
          res.status(200).send(queries);
    //  }
    // else{
    //     res.sendStatus(401);
    // }
})


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