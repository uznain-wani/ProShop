import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../reduxConstants/cartConstants"
import axios from "axios"



export const addToCart = (id,qty) => async(dispatch,getState)=> {
 console.log(" debugging",id,qty)
  // getState  enables saving anything to local storage and here we want to save cartItems by getState.cart
  const {data} = await axios.get(`/api/products/${id}`)
   dispatch({
    type:CART_ADD_ITEM,    //wrote an entire action directly here instead writing above seperately
    payload:{
        product: data._id,      //payload includes what we want to take from product on productspage to cartpage
        name:data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty,
     
    }
   })
   //we want to store our items from cart to local storage now and we can acess these from store.js
   localStorage.setItem( "cartItems",JSON.stringify(getState().cart.cartItems)) 


   //as local storage only accepts strings  and it will be in json format thats y we strigified it and if we want to take it out we again 
   //need to turn it into json format by json.parse
}
export const  removeFromCart = (id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem( "cartItems",JSON.stringify(getState().cart.cartItems)) 

}
//action for saving shipping adress of user
export const  saveShippingAddress = (data)=>(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem( "shippingAddress",JSON.stringify(data)) 

}
//action for saving payment method of user
export const  savePaymentMethod = (data)=>(dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem( "paymentMethod",JSON.stringify(data)) 
}