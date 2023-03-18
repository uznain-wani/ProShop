
import mongoose from "mongoose";

//create  reviewschema of dbase
const reviewSchema = mongoose.Schema({
    name:{type:String, required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})
//create  productschema of dbase
const productSchema = mongoose.Schema({
    user:{
        //products can be created by admins only but this user is for which admin created new product
        type:mongoose.Schema.Types.ObjectId,    //  mongoose.Schema.Types.ObjectId gives  object ID
       
        ref:"User"
    },
    name:{
        type:String,
     
    
    },
    image:{
        type:String,
        
    },
    brand:{
        type:String,
      
    
    },
    category:{
        type:String,
      

    },
    description:{
        type:String,
      
    },
    reviews:[reviewSchema],//  seperate schema for reviews because it is ggoing to b array of review objects 
    
    rating:{
        type:Number,
   
        default:0
    },
    numReviews:{
        type:Number,

        default:0
    },
    price:{
        type:Number,

        default:0
    },
    countInStock:{
        type:Number,
     
        default:0
    },

},{
    timestamps:true
});
// create  model from schema now 

const Product = mongoose.model( "Product",productSchema);   

export default Product

//now different products will be added into this collection of products in product.js file