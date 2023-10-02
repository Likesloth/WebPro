const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const verifyToken = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    console.log("sckey", scKey.secret);
    if (!token) {
        return res.status(403).send({message: "NO token provided"});
    }
    jwt.verify(token,scKey.secret ,(err,decoded)=>{
        if (err) {
            return res.status(401).send({message:"Unauthorized:"+err});
        }
        req.id = decoded.id;
        next();
    })
};
module.exports = verifyToken;