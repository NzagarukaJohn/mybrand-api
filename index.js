const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");
const query = require("./querry");
const login = require("./login")
const dotenv = require("dotenv")

dotenv.config()

const app = express();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true }) 
  .then(() => { 
    app.use(express.json());

    app.use("/api", routes);
    app.use("/querry", query);
    app.use("/login", login);

    app.listen(3000, () => {
      console.log("Server has started!");
    });
  
  });

  module.exports = app;


