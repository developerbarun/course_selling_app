const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
require("dotenv").config;

const app = express();
mongoose.connect(process.env.MONGODB_URI);

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course",courseRouter);

app.listen(3000,() => {
    console.log("App is running");
    
})