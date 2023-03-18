import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../reduxConstants/cartConstants"; 

 export   const cartReducer = (state = {cartItems:[], shippingAdress:{}}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:

          //here we need to check if item already exists and if not 
            const item = action.payload        //new item we want to add 
            const existItem = state.cartItems.find(x => x.product === item.product)    //product here signifies id  as per actions.js

            if (existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map (x => x.product === existItem.product ? item : x)
                }

            }else {
                return{
                    ...state,
                     cartItems: [...state.cartItems , item]
                

                } 

            }
            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems:state.cartItems.filter((x)=> x.product !== action.payload)
                }
            case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress:action.payload
                    }
            case CART_SAVE_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod:action.payload
                      }
            default:
                    return state
    }

 }
