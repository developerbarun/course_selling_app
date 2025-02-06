const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req,res,next) => {
    try{
            const token = req.headers.authorization;
            const decode = jwt.verify(token,process.env.ADMIN_JWT_SECRETS);
            if(decode){
                req.adminId = decode.adminId;
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
    adminMiddleware
}