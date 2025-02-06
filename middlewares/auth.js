const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth (req,res,next){
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token,process.env.JWT_SECRETS);
        if(decode){
            req.userId = decode.userId;
            next();
        }else{
            res.json({
                msg : "Wrong credits"
            })
        }
    }catch(err){
        res.json({
            Error : err 
        })
    }
}


module.exports = {
    auth
}