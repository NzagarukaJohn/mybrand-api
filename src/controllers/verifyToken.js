import { send } from "express/lib/response";

const jwt = require("jsonwebtoken")
const config = require("config");

// Verify Token
function verifyToken(req, res, next) {
  try{
    const bearerHeader = req.headers.authorization;
    const bearerToken = bearerHeader && bearerHeader.split(' ')[1];
    if (bearerHeader == nul) return res.sendStatus(401);

    // console.log(bearerToken)
    jwt.verify(bearerToken, config.secret, (err,user) =>{
      // console.log(err)
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
  }
  catch(err){
    console.log(err)
  }
  
  }
export{ verifyToken }