const express = require("express");
const mongoose = require("mongoose");

const articleRoutes = require("./routes/article")
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
app.use("/article",articleRoutes)
app.use("/login", loginRouter)
app.use("/signup", signupRouter)

app.listen(5000, () =>{
        console.log("This server has  started")
})
