const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
})

const adminSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
})

const courseSchema = new Schema({
    userId : ObjectId,
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId,
})

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId,
})


const userModel = mongoose.model('user',userSchema);
const adminModel = mongoose.model('admin',adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}