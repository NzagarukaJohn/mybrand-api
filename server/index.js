
const express = require("express");
const mongoose = require("mongoose");

const port = process.env.NODE_ENV || 5000;
const articleRoutes = require("./routes/article")
const queryRouter = require("./routes/query")
const loginRouter = require("./routes/login")
const signupRouter = require("./routes/sign-up")

const config = require("config")

const app = express();

mongoose.connect(config.DBHost, {useNewUrlParser: true});

const  db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose

//middlewares
app.use(express.json())

//middlewares for routes
app.use("/query",queryRouter)
app.use("/login", loginRouter)
app.use("/signup", signupRouter)


app.set("port",port)
app.listen(port, () =>{
        console.log("This server has  started")
})

module.exports = app;
