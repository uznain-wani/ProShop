//this dbase is a seperate script not a part of our project that we just  use to import our  dummy  data  like products.js users .js to proshop
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();
const importData = async ()=>{
    try {
       // clear all 3 collections first of proshopdbase
      await Order.deleteMany()              // deleteMany() with empty parantheiss deletes everything
      await Product.deleteMany() 
      await User.deleteMany() 

       //now add new users from dummy data users.js into model Usermodel.js
        const createdUsers = await User.insertMany(users)

       // since we have a connection between products and users via mongoose.Schema.Types.ObjectId, and we want admin user   
       //to be the object_id for all the products where we only have 1 admin and we want that admin to be connected
       const adminUser = createdUsers[0]._id  //gives admin id  which is the first entry in users.js from createdusers array 

       //adding  now admin user to each product in products.js 
       const sampleProducts = products.map(product =>{
        return {...product, user:adminUser}  //add all products andone more ield of user which includes admin Id
       })
       await Product.insertMany(sampleProducts);   //products gets inserted into dbase

       console.log("data imported sucessfully");
       process.exit()
;        

    } catch (error) {
        console.log(`${error}`);
        process.exit(1);   // 1 mean exit  with failure
        
    }
} 
const destroytData = async ()=>{
    try {
      
      await Order.deleteMany()              
      await Product.deleteMany() 
      await User.deleteMany() 


       console.log("data destroyed sucessfully");
       process.exit()
;        

    } catch (error) {
        console.log(`${error}`);
        process.exit(1);   
        
    }
}

// we can  run this file by typing node backend/seeder -d or and it will destroy else without -d it will importdata 
if (process.argv[2]=== "-d")
{
    destroytData();
}else{
    importData()
}
/*but after adding [ "data:import": "node backend/seeder ",
"data:destroy": "node backend/seeder -d"] in package jason we  can simply type  npm run data:import  or data:destroy*/



