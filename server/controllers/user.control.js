
const User = require("../models/user")
const httpStatus = require("../Utils/httpStatus");
const bcryptjs = require("bcryptjs")
const updateUser = async(req,res)=>{
  try{
     await User.findByIdAndUpdate(req.user._id , req.body , {
        new : true,
     
    })
    return res.status(200).json({status : httpStatus.SUCCESS , data : {message : "USER UPDATED SUCCESSFULLY"}})

  }
  catch(e){
    return res.status(500).json({status : httpStatus.ERROR ,data :{users : null , message : e.message , statusCode : 500}})
}
}
const updatePassword = async(req,res)=>{
    try{
        const {oldPassword , newPassword} = req.body
       
        const user = await User.findById(req.user._id)
        
        const validPassword = await bcryptjs.compare(oldPassword , user.password)
      
        if(!validPassword){
            return res.status(403).json({status : httpStatus.FAIL , data : {message : "UNATHUORIZED USER"}})
    
        }
       
        else{
            let hashPassword = await bcryptjs.hash(newPassword , 8)
           
            user.password = hashPassword
            console.log(user.password)
            await user.save()
            return res.status(200).json({status : httpStatus.SUCCESS , data : {messager : "PASSWORD UPDATED SUCCESSFULLY"}})

       
        }
    }
    catch(e){
        return res.status(500).json({status : httpStatus.ERROR ,data :{ message : e.message , statusCode : 500}})
    }

}
// GET ONE USER

const getUser = async(req,res)=>{
    try{
        console.log(req.user._id)
        const user = await User.findById(req.user._id)
        return res.status(200).json({status : httpStatus.SUCCESS , user})
    }
    catch(e){
        return res.status(500).json({status : httpStatus.ERROR , users : null , message : e.message , statusCode : 500})
    }
}
const getAllUsers = async(req,res)=>{
    try{
       
        const users = await User.find({} , {"__v" : false})
        if(!users) res.status(404).json({status : httpStatus.FAIL , message : "USERS NOT FOUND"})
        return res.status(200).json({status : httpStatus.SUCCESS , users})
    }
    catch(e){
        return res.status(500).json({status : httpStatus.ERROR ,users : null , message : e.message , statusCode : 500})
    }
}



const deleteUser = async(req,res)=>{
    try{
        console.log(req.params.id)
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({status : httpStatus.FAIL , message : "User Not Found"})
        }
      
        return res.status(200).json({status : httpStatus.SUCCESS , message : "USER DELETED SUCCESSFULLY"})

    }
    catch(e){
        return res.status(500).json({status : httpStatus.ERROR , users : null , message : e.message , statusCode : 500})
    }
}


const logout = async(req,res)=>{
    try{
        res.cookie("access_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        let user = await User.findById(req.user._id)
        user.tokens = user.tokens.filter((el)=>{return el!== req.token})
        await user.save()
          return res.send()

    }
    catch(e){
        return res.status(500).json({status : httpStatus.ERROR ,users : null , message : e.message , statusCode : 500})
    }
   
}
module.exports = {getAllUsers,getUser,deleteUser,updateUser,updatePassword,logout}