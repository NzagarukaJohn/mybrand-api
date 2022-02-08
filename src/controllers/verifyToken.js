const jwt = require("jsonwebtoken")
const config = require("config");

// Verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
  // console.log(bearerToken)
    jwt.verify(bearerToken, config.secret, (err,user) =>{
      // console.log(err)
        if (err) return res.sendStatus(401);
        req.user = user;
    })
      next();
    } else {
      console.log(bearerHeader)
      res.sendStatus(401);
    }
  
  }
export{ verifyToken }