

const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")

const articleRoutes = require("./routes/article")
const queryRouter = require("./routes/query")
const likeRouter = require("./routes/like")
const commentRouter = require("./routes/comment")

const loginRouter = require("./routes/login")
const signupRouter = require("./routes/sign-up")



const port =  5000;
const config = require("config")


const app = express();


const connectDB = async () => {
        await mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
                //middlewares
                app.use(express.json())

                //middlewares for routes
                app.use("/article",articleRoutes)
                app.use("/queries",queryRouter)
                app.use("/like",likeRouter)
                app.use("/comment",commentRouter)

                app.use("/login", loginRouter)
                app.use("/signup", signupRouter)


                app.set("port",port)

                app.listen(port, () =>{
                       /// console.log("Server started")
                })

        })
            .catch(function (error) {
                console.log(`Unable to connect to the Mongo db  ${error} `);
            });
    };
    
    // use as a function        
    connectDB();
    module.exports = app;
