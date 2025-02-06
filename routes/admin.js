const {Router} = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");


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

adminRouter.post("/course", adminMiddleware, async(req,res) => {
    const creatorId = req.adminId;
    const { title,description, price,imageUrl } = req.body; 
    try{
        const course = await courseModel.create({
            title,description, price,imageUrl , creatorId
        })

        res.json({
            msg : "Course added to db",
            courseID : course._id
        })
    }catch(err){
        res.status(403).json({
            msg : "Something went wrong"
        })
    }
})

adminRouter.put("/course",adminMiddleware, async(req,res) => {
    const creatorId = req.adminId;
    const { title,description, price,imageUrl,courseId } = req.body; 
    try{
        const course = await courseModel.updateOne({
            _id : courseId,
            creatorId : creatorId
        },{
            title,description, price, imageUrl
        })

        res.json({
            msg : "Course updated",
            courseID : course._id
        })
    }catch(err){
        res.status(403).json({
            msg : "Something went wrong"
        })
    }
})

adminRouter.get("/course/all",adminMiddleware, async(req,res) => {
    const creatorId = req.adminId;
    try{
        const course = await courseModel.find({
            creatorId : creatorId
        })

        res.json({
            course : course,
            courseID : course._id
        })
    }catch(err){
        res.status(403).json({
            msg : "Something went wrong"
        })
    }
})

module.exports = {
    adminRouter
}