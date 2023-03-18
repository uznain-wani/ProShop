import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, 
  productTopRatedReducer, productUpdateReducer } from './reduxReducers/productReducers'
import { cartReducer } from './reduxReducers/cartReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer,
    userUpdateReducer } from './reduxReducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reduxReducers/orderReducers'

// for acessing cartitems  that we stored in local storage,we need to convert that from string to json format

const  cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]

const  userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")):null
const  shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")):{}

 const initialState = {
   cart :
   {cartItems: cartItemsFromStorage,
   shippingAddress:shippingAddressFromStorage},
   
   userLogin:
   {userInfo:userInfoFromStorage}
  } 

 const store = configureStore({
  reducer:{
     productList:productListReducer,   //we acess state in app by this name now productList and productDetails
     productDetails:productDetailsReducer,
     productDelete:productDeleteReducer,
     productCreate:productCreateReducer,
     productUpdate:productUpdateReducer,
     productTopRated:productTopRatedReducer,
     productReviewCreate:productReviewCreateReducer,
     cart: cartReducer,
     userLogin:userLoginReducer,
     userRegister:userRegisterReducer,
     userDetails:userDetailsReducer,
     userUpdateProfile:userUpdateProfileReducer,
     userList:userListReducer,
     userDelete:userDeleteReducer,
     userUpdate:userUpdateReducer,
     orderCreate:orderCreateReducer,
     orderDetails:orderDetailsReducer,
     orderPay:orderPayReducer,
     orderListMy:orderListMyReducer,
     orderList:orderListReducer,
     orderDeliver:orderDeliverReducer
     
    
    

  },

  preloadedState: initialState,
  middleware:[thunk]
 })

 export default store