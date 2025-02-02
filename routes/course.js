const { Router } = require("express");

const courseRouter = Router();


courseRouter.get("/purchases",auth, (req,res) => {

})

courseRouter.get("/preview",auth, async(req,res) => {
    
})


module.exports = {
    courseRouter
}