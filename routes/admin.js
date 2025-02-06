const {Router} = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");


adminRouter.post("/signup", async (req,res) => {
    try{
        const { email , password, firstName, lastName } = req.body;
        await adminModel.create({
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName
        })
        res.json({
            msg : "Added to db",
        })
    }catch(err){
        res.json({
            msg : "error : " + err,
        })        
    }
})

adminRouter.post("/signin", async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const admin = await adminModel.findOne({
            email : email,
            password : password
        })
        if(admin){
            const token = jwt.sign({adminId : admin._id},process.env.ADMIN_JWT_SECRETS);
            res.json({
                msg : "signed in",
                token : token
            })            
        }else{
            res.json({
                msg : "Please signin"
            })
        }
    }catch(err){
        res.json({
            msg : "Error : "  + err,
        })
    }
})

adminRouter.post("/", (req,res) => {

})

adminRouter.put("/course", (req,res) => {

})

adminRouter.get("/course/all", (req,res) => {

})

module.exports = {
    adminRouter
}