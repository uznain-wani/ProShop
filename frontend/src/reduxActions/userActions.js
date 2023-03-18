//  we want to make login action to make request to login and get the token from user

import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET,
     USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST
    , USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS, 
     USER_UPDATE_FAIL, 
     USER_UPDATE_PROFILE_FAIL, 
     USER_UPDATE_PROFILE_REQUEST,
     USER_UPDATE_PROFILE_SUCCESS,
     USER_UPDATE_REQUEST,
     USER_UPDATE_SUCCESS} from "../reduxConstants/userConstants"
import axios from "axios"
import { ORDER_DETAILS_RESET, ORDER_LIST_MY_RESET, ORDER_PAY_RESET } from "../reduxConstants/orderConstants"

export const login = (email,password) => async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST,
        })
        const config ={  //we accept token here for checking it out and logging person in
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post ("/api/users/login",{email,password},config)
        
        dispatch({ 
            type :USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem( "userInfo",JSON.stringify(data))
        
    } catch (error) {
        dispatch ({type:USER_LOGIN_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }

}
//for logging out action  that is clearig from local storage
 export const logout = () =>(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch ({type :USER_LOGOUT})
    dispatch ({type :USER_DETAILS_RESET})
    dispatch ({type :ORDER_LIST_MY_RESET})
    dispatch ({type :USER_LIST_RESET})


    


 }
 //for registering action is 
 export const register = ( name,email,password) => async(dispatch)=>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST,
        })
        const config ={  //we accept token here for checking it out and logging person in
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post ("/api/users",{ name,email,password},config)  //api/users is route created already in usercontroler.js for adding new users 
        
        dispatch({ 
            type :USER_REGISTER_SUCCESS,
            payload:data,
        })
        // we now want as soon as user registers he gets logged in so we dispatch login action here
        dispatch({ 
            type :USER_LOGIN_SUCCESS,
            payload:data,
        })


        localStorage.setItem( "userInfo",JSON.stringify(data))
        
    } catch (error) {
        dispatch ({type:USER_REGISTER_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }

}

//action for getting userdetails or profile on route api/users/profile

export const getUserDetails = (id) => async(dispatch,getState)=>{    //in id profile is passed in ProfileScreen.js
    try {
        dispatch({
            type:USER_DETAILS_REQUEST,
        })

//destructuring from getState() function which gives acesss to state,getting userinfo from userLogin which is stored in store.js from getstate()
   
const {userLogin :{userInfo},}  = getState()  // this is actually getstate.userlogin.userinfo as we will get acess to token via this userinfo

        const config ={  //we accept token here for checking it out and logging person in 
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}` //getting token entered by user
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)  //in id profile will be passed in profilescree.js
        
        dispatch({ 
            type :USER_DETAILS_SUCCESS,
            payload:data,
        })

        
    } catch (error) {
        dispatch ({type:USER_DETAILS_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }
 }

 //action creator for updating profile now

 export const updateUserProfile = (user) => async(dispatch,getState)=>{    //in id profile is passed in ProfileScreen.js
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST,
        })

//destructuring from getState() function which gives acesss to state,getting userinfo from userLogin which is stored in store.js from get
   
const {userLogin :{userInfo},}  = getState()  // this is actually getstate.userlogin.userinfo as we will get acess to token via this user

        const config ={  //we accept token here for checking it out and logging person in 
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}` //getting token entered by user
            }
        }
        const {data} = await axios.put (`/api/users/profile`,user,config)  //in id profile will be passed in profilescree.js
        
        dispatch({ 
            type :USER_UPDATE_PROFILE_SUCCESS,
            payload:data,
        })

        dispatch({ 
            type :USER_LOGIN_SUCCESS,
            payload:data,
        })
     localStorage.setItem("userInfo",JSON.stringify(data))
        
    } catch (error) {
        dispatch ({type:USER_UPDATE_PROFILE_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }
 }

 //action for listing users to admin only 

 export const listUsers = () => async(dispatch,getState)=>{    //in id profile is passed in ProfileScreen.js
    try {
        dispatch({
            type:USER_LIST_REQUEST,
        })

//destructuring from getState() function which gives acesss to state,getting userinfo from userLogin which is stored in store.js from get
   
const {userLogin :{userInfo},}  = getState()  // this is actually getstate.userlogin.userinfo as we will get acess to token via this user

        const config ={  //we accept token here for checking it out and logging person in 

            headers:{
                Authorization:`Bearer ${userInfo.token}` //getting token entered by user
            }
        }
        const {data} = await axios.get (`/api/users`,config)  //in id profile will be passed in profilescree.js
        
        dispatch({ 
            type :USER_LIST_SUCCESS,
            payload:data,
        })

        
    } catch (error) {
        dispatch ({type:USER_LIST_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }
 }

 //action for deleting user by admin only 
export const deleteUser = (id) => async(dispatch,getState)=>{    //in id profile is passed in ProfileScreen.js
    try {
        dispatch({
            type:USER_DELETE_REQUEST,
        })

  const {userLogin :{userInfo},}  = getState()  // this is actually getstate.userlogin.userinfo as we will get acess to token via this user
       
  const config ={  //we accept token here for checking it out and logging person in 
            headers:{
                Authorization:`Bearer ${userInfo.token}` //getting token entered by user
            }
        }
await axios.delete (`/api/users/${id}`,config)  //in id profile will be passed in profilescree.js
   
   dispatch({ 
       type : USER_DELETE_SUCCESS })
        
    } catch (error) {
        dispatch ({type:USER_DELETE_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }
 }
  

  //action for updating user by admin only 
export const updateUser = (user) => async(dispatch,getState)=>{    //in id profile is passed in ProfileScreen.js
    try {
        dispatch({
            type:USER_UPDATE_REQUEST,
        })

  const {userLogin :{userInfo},}  = getState()  // this is actually getstate.userlogin.userinfo as we will get acess to token via this user
       
  const config ={  //we accept token here for checking it out and logging person in 
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}` //getting token entered by user
            }
        }
  const {data} = await axios.put(`/api/users/${user._id}` , user,config)  //in id profile will be passed in profilescree.js
   
   dispatch({   type : USER_UPDATE_SUCCESS })
   dispatch({   type : USER_DETAILS_SUCCESS, payload : data })
        
    } catch (error) {
        dispatch ({type:USER_UPDATE_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }}