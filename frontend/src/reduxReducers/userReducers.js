import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../reduxConstants/userConstants"


export const userLoginReducer =(state = { }, action) => {
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading:true
            }
        case  USER_LOGIN_SUCCESS:
            return{
              loading:false,
              userInfo:action.payload,   //userinfo contains all user details from backend usercontroller .js which can be acessesd
              error:''                     //like userinfo.name,userinfo.email
            }
         case  USER_LOGIN_FAIL:
         return{
            loading:false,
            error:action.payload,
          }
          case  USER_LOGOUT:
            return{}


          default :return state
    }
}

//for registering now reducer is
export const userRegisterReducer =(state = { }, action) => {
  switch (action.type){
      case USER_REGISTER_REQUEST:
          return {
              ...state,
              loading:true
          }
      case  USER_REGISTER_SUCCESS:
          return{
            loading:false,
            userInfo:action.payload,   //userinfo contains all user details from backend usercont
            error:''                     //like userinfo.name,userinfo.email
          }
       case  USER_REGISTER_FAIL:
       return{
          loading:false,
          error:action.payload,
        }


        default :return state
  }
} 

 //reducer for userdetails or profile 
export const userDetailsReducer =(state ={user :{ }}, action) => {
  switch (action.type){
      case USER_DETAILS_REQUEST:
          return {
              ...state,
              loading:true
          }
      case  USER_DETAILS_SUCCESS:
          return{
            loading:false,
            user:action.payload,    //this payload is data we get from usercontrollers.js under this profile route
                        
          }
       case  USER_DETAILS_FAIL:
       return{
          loading:false,
          error:action.payload,
        }
       case  USER_DETAILS_RESET:
         return{ user:{}}


        default :return state
  }
}
//FOR updating profile reducer is

 export const userUpdateProfileReducer =(state ={}, action) => {
  switch (action.type){
      case USER_UPDATE_PROFILE_REQUEST:
          return {
              ...state,
              loading:true
          }
      case  USER_UPDATE_PROFILE_SUCCESS:
          return{
            loading:false,
            userInfo:action.payload, 
            success:true,   //this payload is data we get from usercontr
            error:''                   
          }
       case  USER_UPDATE_PROFILE_FAIL:
       return{
          loading:false,
          error:action.payload,
        }
        case  USER_UPDATE_PROFILE_RESET:
          return{}
        default :return state
  }
}

//FOR displaying users  list to admin only 

export const userListReducer =(state ={ users:[] }, action) => {
  switch (action.type){
      case USER_LIST_REQUEST:
          return {
              ...state,
              loading:true
          }
      case  USER_LIST_SUCCESS:
          return{
            loading:false,
            users:action.payload,
                         
          }
       case  USER_LIST_FAIL:
       return{
          loading:false,
          error:action.payload,
        }
        case  USER_LIST_RESET:
         return{ users:[]}


        default :return state
  }
}
////FOR deleting any user by admin only

export const userDeleteReducer =(state ={  }, action) => {
  switch (action.type){
      case USER_DELETE_REQUEST:
          return {
              ...state,
              loading:true
          }
      case  USER_DELETE_SUCCESS:
          return{
            loading:false,
            success:true,
          }
       case  USER_DELETE_FAIL:
       return{
          loading:false,
          error:action.payload,
        }


        default :return state
  }
}

////FOR updating any user by admin only

export const userUpdateReducer =(state ={ user:{} }, action) => {
  switch (action.type){
      case USER_UPDATE_REQUEST:
          return {
              ...state,
              loading:true
          }
      case  USER_UPDATE_SUCCESS:
          return{
            loading:false,
            success:true,
          }
       case  USER_UPDATE_FAIL:
       return{
          loading:false,
          error:action.payload,
        }
      case USER_UPDATE_RESET:
        return{user:{}}

        default :return state
  }
}