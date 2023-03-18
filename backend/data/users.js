// users added to collection ""users" created in usermodel.js
import bcrypt from "bcryptjs"

const users = [
 {
    name:"Admin User",
    email:"admin@example.com",
    password:bcrypt.hashSync("123456", 10),             // 10 is the number of salt rounds
    isAdmin:true
 },
 {
    name:"Uznain",
    email:"uznain@example.com",
    password:bcrypt.hashSync("123456", 10),   
   
 },
 {
    name:"Fariz",
    email:"fariz@example.com",
    password:bcrypt.hashSync("123456", 10),   
   
 },
 {
    name:"Munazah",
    email:"munazah@example.com",
    password:bcrypt.hashSync("123456", 10),   

 },
 {
   name:"Mohsin",
   email:"mohsin@example.com",
   password:bcrypt.hashSync("123456", 10),   
},
 
 ]
 export default users

 //for hashing passwords bycryptjs is used

