const { string } = require("joi")
const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique:true,
        trim : true,
       
    },
    password : {
        type : String,
       
       
     
    },
    tokens : [
        {
            type : String,
            required : true
        }
    ],
    role : {
        type : String,
        enum : ["USER" , "ADMIN"],
        default : "USER"
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema)
module.exports = User