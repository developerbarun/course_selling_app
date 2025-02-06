const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = Router();



courseRouter.post("/purchases", userMiddleware, async(req,res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    const purchases = await purchaseModel.create({
        userId,courseId
    })
    res.json({
        courses : purchases
    })
})

courseRouter.get("/preview", async(req,res) => {
    const courses = await courseModel.find({});
    res.json({
        courses : courses
    })
})


module.exports = {
    courseRouter
}