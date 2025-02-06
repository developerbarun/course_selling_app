const { Router, application } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
const userRouter = Router();

userRouter.post("/signup", async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        await userModel.create({
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

userRouter.post("/signin", async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await userModel.findOne({
            email : email,
            password : password
        })
        if(user){
            const token = jwt.sign({userId : user._id,},process.env.USER_JWT_SECRETS);
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

userRouter.get("/purchase",userMiddleware ,async(req,res) => {
    const userId = req.userId;
    const purchases = await purchaseModel.find({userId});

    // const purchasedCourse = [];
    // for(let i=0;i<purchases.length;i++){
    //     purchasedCourse.push(purchases[i].courseId);
    // }

    const courseData = await courseModel.find({
        _id : { $in : purchases.map(x => x.courseId) }
    })

    res.json({
        purchases : purchases,
        courseData

    })
})

module.exports = {
    userRouter
}