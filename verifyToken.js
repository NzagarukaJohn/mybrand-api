const jwt = require("jsonwebtoken")

const secret = process.env.JWT_TOKEN;

// Verify Token
module.exports=   (req,res,next)=>{

  const bearerHeader = req.headers.authorization;
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
  // console.log(bearerToken)
    jwt.verify(bearerToken, secret, (err,user) =>{
      // console.log(err)
        if (err) return res.sendStatus(401);
        req.user = user;
    })
      next();
    } else {
      res.sendStatus(400);
    }
  
  }
