import Order from "../models/orderModel.js"  
import  asyncHandler  from "express-async-handler" ;   // instead of try catch we use this for catching error  in any route easily



// for   creating a new order
//Post request  to /api/orders
//this is protected route and private 

const addOrderItems = asyncHandler(async (req,res)=>{
  //certain items needed from body of order model
  const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}= req.body

  if(orderItems && orderItems.length===0){
    res.status(400)
    throw new Error("No order items")
    return
  }else{
    const order = new Order({
        orderItems,
         user :req.user._id,  //will get logged in user via this id
        shippingAddress,
        paymentMethod,
        itemsPrice,     //all these things will be passed
        taxPrice,
        shippingPrice,
        totalPrice
    })
    const createdOrder =await order.save()  //save order in dbase
    res.status(201).json(createdOrder)
  }

})


// get particular  order by id 
//GET request  to /api/orders/:id
//this is protected route  and private

const getOrderById = asyncHandler(async (req,res)=>{
  //to  add  name and email of user also  along with id,we use populate() 
  const order = await Order.findById(req.params.id).populate("user","name email") 
  if (order){
     res.json(order)
  }else{
     res.status(404)
     throw new error("Order not found")
  }

})



// update order to paid
//GET request  to /api/orders/:id/pay
//this is protected route  and private

const updateOrderToPaid = asyncHandler(async (req,res)=>{
  //to  add  name and email of user also  along with id,we use populate() 
  const order = await Order.findById(req.params.id)
  if (order){
     order.isPaid = true
     order.paidAt = Date.now()
     order.paymentResult ={  //this is going to come from paypal
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.email_address

     }
  const updatedOrder = await order.save()
  res.json(updatedOrder)
  }else{
     res.status(404)
     throw new error("Order not found")
  }

})

// get logged in user orders in profile 
//GET request  to /api/orders/myorders
//this is protected route  and private

const getMyOrders = asyncHandler(async (req,res)=>{
  //to  add  name and email of user also  along with id,we use populate() 
  const orders = await Order.find({user:req.user._id})  //finding only the logged in user via his id
  
  res.json(orders)

  

})

// get all orders by admin on order screen
//GET request  to /api/orders/
//this is protected route  and private

const getOrders = asyncHandler(async (req,res)=>{
  //to  add  name and email of user also  along with id,we use populate() 
  const orders = await Order.find({}).populate("user","id name")    //we will get id and name from user
  
  res.json(orders)
})


// update order to delivered
//GET request  to /api/orders/:id/deliver
//this is protected route  and private route to admin only

const updateOrderToDelivered = asyncHandler(async (req,res)=>{
  //to  add  name and email of user also  along with id,we use populate() 
  const order = await Order.findById(req.params.id)
  if (order){
     order.isDelivered = true
     order.deliveredAt = Date.now()

  const updatedOrder = await order.save()
  res.json(updatedOrder)
  }else{
     res.status(404)
     throw new error("Order not found")
  }

})




export {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered}
