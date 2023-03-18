//middleware for accepting token from user and give him acess to his profile
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"


 const protect =  asyncHandler(async(req,res,next) =>{
    let token 
   // console.log(req.headers.authorization)  //token of user  will get console logged
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
   )
   {
     try {
      //  split will turn it into array where token is [1] and bearer is [2]
        token =  req.headers.authorization.split(" ")[1]  //will return only token[1] not bearer

       // decoding  got token  from user
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

       // find user from dbase by decoded-id from token
        req.user = await User.findById(decoded.id).select("-password")
        
        next()
        
     } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error ("Not authorized,token failed")
     }
   }
   if(!token){
   res.status(401)
   throw new Error ("Not authorized,no token")}
 
 })

 //middleware for acess to /api/users route  by only admin 
 const admin =(req,res,next)=>{
    if(req.user && req.user.isAdmin){ // if user is logged in and also he is admin then next()
      next()
    }else{
      res.status(401)
      throw new Error ("Not authorized as an admin")
    }
 
 
 }
 export {protect,admin}