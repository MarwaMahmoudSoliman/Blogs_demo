const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true

    },
    content : {
        type : String,
        required : true,
        trim : true

    },
    image : {
        type : String,
        trim : true
    },
    date : {
        type : String,
        required : true,
        trim : true
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    }
})


const Blog = mongoose.model("Blog" , blogSchema)
module.exports = Blog