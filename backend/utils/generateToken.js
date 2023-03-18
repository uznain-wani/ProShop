import jwt from "jsonwebtoken"


//token enablrs to authorize user ,to acess info after protected routes  like profile route after loggin in 

 //we want to add id as payload in this token
 const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"50d"})   // Payload is secret stored in env file and id and expiry date
 }
  export default generateToken