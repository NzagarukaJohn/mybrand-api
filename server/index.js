

const express = require("express");
const mongoose = require("mongoose");

const articleRoutes = require("./routes/article")
const likeRouter = require("./routes/like")
const commentRouter = require("./routes/comment")

const loginRouter = require("./routes/login")
const signupRouter = require("./routes/sign-up")

const port = process.env.NODE_ENV || 5000;
const config = require("config")

const connectDB = async () => {
        await mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            const app = express();
                //middlewares
                app.use(express.json())

                //middlewares for routes
                app.use("/article",articleRoutes)
                app.use("/like",likeRouter)
                app.use("/comment",commentRouter)

                app.use("/login", loginRouter)
                app.use("/signup", signupRouter)


                app.set("port",port)

                app.listen(port, () =>{
                        console.log("Server started")
                })

        })
            .catch(function (error) {
                console.log(`Unable to connect to the Mongo db  ${error} `);
            });

    };
    
    // use as a function        
    connectDB();
