import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL,
     PRODUCT_DELETE_REQUEST,
     PRODUCT_DELETE_SUCCESS,
     PRODUCT_CREATE_FAIL,
     PRODUCT_CREATE_SUCCESS,
     PRODUCT_CREATE_REQUEST,
     PRODUCT_UPDATE_REQUEST,
     PRODUCT_UPDATE_SUCCESS,
     PRODUCT_UPDATE_FAIL,
     PRODUCT_CREATE_REVIEW_REQUEST,
     PRODUCT_CREATE_REVIEW_SUCCESS,
     PRODUCT_CREATE_REVIEW_FAIL,
     PRODUCT_TOP_REQUEST,
     PRODUCT_TOP_FAIL,
     PRODUCT_TOP_SUCCESS} from "../reduxConstants/productContants"
import axios from"axios"


//Actions in actioncreators
export const productListRequest =()=>{
    return {
        type:PRODUCT_LIST_REQUEST
    }
 }
 const   productListSuccess=(products)=>{
    return {
        type:PRODUCT_LIST_SUCCESS,
        payload:products
    }
 }
 const productListFail =(error)=>{
    return {
        type:PRODUCT_LIST_FAIL,
        payload:error
    }
 }
 //action creator for async action to fetch data  enabled by thunk and thunk enables to return function rather than object in this
export const  listProducts = (keyword = "" , pageNumber ="")=> async (dispatch) =>{
    try {
        dispatch(productListRequest())      //it will dispatch productlistrequest and set loading to true
       const {data} =   await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
      
           dispatch(productListSuccess(data))
         
        
    } catch (error) {
        dispatch (productListFail(
            error.response && error.response.data.message ? error.response.data.message :error.message
            ))
        
    }
}
//action creater for fetching  particular product details but in brief and compact way ,it becomes eaxy we can repeat above way as well
export const  listProductDetails = (id)=> async (dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})      //it will dispatch productlistrequest and set loading to true
         const {data} = await axios.get(`/api/products/${id}`)
       
           dispatch( {
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,   //here it will be single piece of data or product
         })
        
    } catch (error) {
        dispatch ({type:PRODUCT_DETAILS_FAIL,
                  payload:  error.response && error.response.data.message ? error.response.data.message :error.message
     })
        
    }
    
}
 //action for deleting any product by admin only 
export const deleteProduct = (id)=>async(dispatch,getState)=>{
    try {
      dispatch({type:PRODUCT_DELETE_REQUEST})
  
      const{userLogin:{userInfo},} = getState() //we want userinfo from userlogin via getState()
  
      const config = {
          headers:{
            Authorization:`Bearer ${userInfo.token}`,
          }
      }
  const {data}= await axios.delete(`/api/products/${id}`,config) 
  dispatch({
      type:PRODUCT_DELETE_SUCCESS,
      payload:data
  })
      
    } catch (error) {
      dispatch ({type:PRODUCT_DETAILS_FAIL,
          payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
      
    }
  }

   //action for deleting any product by admin only 
export const  createProduct = ()=>async(dispatch,getState)=>{
    try {
      dispatch({type:PRODUCT_CREATE_REQUEST})
  
      const{userLogin:{userInfo},} = getState() //we want userinfo from userlogin via getState()
  
      const config = {
          headers:{
            Authorization:`Bearer ${userInfo.token}`,
          }
      }
  const {data}= await axios.post(`/api/products/`,{},config) 
  dispatch({
      type:PRODUCT_CREATE_SUCCESS,
      payload:data
  })
      
    } catch (error) {
      dispatch ({type:PRODUCT_CREATE_FAIL,
          payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
      
    }
  }
   //action for updatingg any product by admin only 
   export const  updateProduct = (product)=>async(dispatch,getState)=>{
    try {
      dispatch({type:PRODUCT_UPDATE_REQUEST})
  
      const{userLogin:{userInfo},} = getState() //we want userinfo from userlogin via getState()
  
      const config = {
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${userInfo.token}`,
          }
      }
  const {data}= await axios.put(`/api/products/${product._id}`, product, config) 
  dispatch({
      type:PRODUCT_UPDATE_SUCCESS,
      payload:data
  })
      
    } catch (error) {
      dispatch ({type:PRODUCT_UPDATE_FAIL,
          payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
      
    }
  }

   //action for adding review by user
 export const createProductReview = (productId,review)=>async(dispatch,getState)=>{
  try {
    dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})
  
    const{userLogin:{userInfo},} = getState() //we want userinfo from userlogin via getState()
  
    const config = {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${userInfo.token}`,
        }
    }
await axios.post(`/api/products/${productId}/reviews`,review, config) 
dispatch({
    type:PRODUCT_CREATE_REVIEW_SUCCESS,
   
})
    
  } catch (error) {
    dispatch ({type:PRODUCT_CREATE_REVIEW_FAIL,
        payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
    
  }
}

//action creater for top rated products
export const  listTopProducts = ()=> async (dispatch) =>{
  try {
      dispatch({type:PRODUCT_TOP_REQUEST})      //it will dispatch productlistrequest and set loading to true
       const {data} = await axios.get(`/api/products/top`)
     
         dispatch( {
          type:PRODUCT_TOP_SUCCESS,
          payload:data,   //here it will be single piece of data or product
       })
      
  } catch (error) {
      dispatch ({type:PRODUCT_TOP_FAIL,
                payload:  error.response && error.response.data.message ? error.response.data.message :error.message
   })
      
  }
  
}

