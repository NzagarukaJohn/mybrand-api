const express = require("express");
const mongoose = require("mongoose");

const queryRoutes = require("./routes/query");
const loginRouter = require("./routes/login")

const config = require("config")

const app = express();

mongoose.connect(config.DBHost, {useNewUrlParser: true});

const  db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose

//middlewares
app.use(express.json())

//middlewares for routes
app.use("/queries",queryRoutes)
app.use("/login", loginRouter)

app.listen(5000, () =>{
        console.log("This server has  started")
})
