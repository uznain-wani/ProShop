import _default from "concurrently";
import mongoose from "mongoose";

//create orderchema of dbase
const orderSchema = mongoose.Schema({
   // this  is the user that buys the product that is user connected with order
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    orderItems:[{       //array of ordered items details
       name:{type:String,required:true},
       qty:{type:Number,required:true},
       image:{type:String,required:true},
       price:{type:Number,required:true},
       product:{ //it will have realtionship with the product model
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"Product"
       } 
    }],
    shippingAddress:{ // it includes embedded objects 
       address:{ type:String,required:true}, 
       city:{ type:String,required:true}, 
       postalCode:{ type:String,required:true}, 
       country:{ type:String,required:true}, 
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    },
    deliveredAt:{
        type:Date
    },

},{
    timestamps:true   //adds two things to collection createdAt() and updatedAt() property
});
// create  model from schema now 

const Order = mongoose.model( "Order",orderSchema);   //   created "orders" which is the collection name in db  but must be written singular here

export default Order