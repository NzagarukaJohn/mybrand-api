

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const api = require("./routes/api")
const articleRoutes = require("./routes/article")
const queryRouter = require("./routes/query")
const likeRouter = require("./routes/like")
const commentRouter = require("./routes/comment")

const loginRouter = require("./routes/login")
const signupRouter = require("./routes/sign-up")


const PORT = process.env.PORT || 5000;
const config = require("config")

import { swaggerDocs } from "./swagger";

const app = express();

const connectDB = async () => {
        await mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
                //middlewares
                app.use(express.json())
                 
                //middlewares for routes
                app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

                app.use("/",api)
                app.use("/article",articleRoutes)
                app.use("/query",queryRouter)
                app.use("/like",likeRouter)
                app.use("/comment",commentRouter)

                app.use("/login", loginRouter)
                app.use("/signup", signupRouter)


                app.set("port",PORT)

                app.listen(PORT, () =>{
                  if(config.util.getEnv('NODE_ENV') != 'test'){
                    console.log("server started")
                    swaggerDocs(app,PORT)
                    } 
                  })

        })
            .catch(function (error) {
                console.log(`Unable to connect to the Mongo db  ${error} `);
            });
    };
    
    // use as a function        
    connectDB();
    module.exports = app;
