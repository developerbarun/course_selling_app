const {Router} = require("express");
const { adminAuth } = require("../middlewares/adminMiddleware");
const adminRouter = Router();

app.use(adminAuth)

adminRouter.post("/signup", async (req,res) => {

})

adminRouter.post("/signin", async (req,res) => {

})

adminRouter.post("/course", (req,res) => {

})

adminRouter.put("/course", (req,res) => {

})

adminRouter.get("/course.all", (req,res) => {

})

module.exports = {
    adminRouter
}