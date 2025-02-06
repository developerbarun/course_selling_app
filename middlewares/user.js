const jwt = require("jsonwebtoken");
require("dotenv").config();

const userMiddleware = (req,res,next) => {
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token,process.env.USER_JWT_SECRETS);
        if(decode){
            req.userId = decode.userId;
            next();
        }else{
            res.status(403).json({
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
    userMiddleware
}