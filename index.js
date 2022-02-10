const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");
const query = require("./querry");
const login = require("./login")

const app = express();

mongoose
//.connect("mongodb+srv://john:nzagaruka@cluster0.eiezz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true })
  .connect("mongodb+srv://john:nzagaruka@cluster0.eiezz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true }) 
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


