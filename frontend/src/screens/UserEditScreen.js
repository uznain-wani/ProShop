import React, { useState,useEffect } from 'react'
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link,  useNavigate,    useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../reduxActions/userActions'
import { USER_UPDATE_RESET } from '../reduxConstants/userConstants'


const UserEditScreen = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [isAdmin,setIsAdmin] = useState(false)



    const params = useParams()
    const userId = params.id
    const navigate = useNavigate()

    const dispatch =useDispatch()

    const userDetails = useSelector(state =>state.userDetails)
    const{loading,error,user} = userDetails

    const userUpdate = useSelector(state =>state.userUpdate)
    const{loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate

    
    useEffect(()=>{
        if(successUpdate){
          dispatch({type:USER_UPDATE_RESET})
          navigate("/admin/userlist")
        }else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
     

    },[user,dispatch, navigate,userId,successUpdate])
 
    
    const SubmitHandler = (e) =>{
        e.preventDefault()  //for disbaling refreshing of page
        dispatch(updateUser({_id:userId,name,email,isAdmin}))
    }

  return ( 
    <>
      <Link to= "/admin/userlist" className='btn btn-light  my-3'> Go Back</Link>

      <FormContainer>
    <h1>Edit User</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate && <Message variant ="danger">{errorUpdate}</Message>}

    {loading ?<Loader/>:error ?<Message varaiant ="danger">{error}</Message>:(

         <Form onSubmit={SubmitHandler}>
            {/* //for name */}
            <FormGroup controlId='name'>
            <FormLabel   className="pasword" >Name</FormLabel>
            <FormControl
            type='name'
            placeholder='Enter Your Name'
            value ={name}
            onChange={(e)=>setName(e.target.value)}>
            </FormControl>
             </FormGroup>
        
             {/* for email form group  */}
                <FormGroup controlId='email'>
                    <FormLabel   className="pasword">Email Address</FormLabel>
                    <FormControl
                    type='email'
                    placeholder='Enter Email'
                    value ={email}
                    onChange={(e)=>setEmail(e.target.value)}>
                    </FormControl>
                </FormGroup>
                
            {/* for checkbox  */}
            <FormGroup controlId='isAdmin'>
                   <FormCheck
                   type='checkbox'
                   label='Is Admin'
                   checked ={isAdmin}
                   onChange={(e)=>setIsAdmin(e.target.checked)}
                   className="pasword" ></FormCheck>
               </FormGroup>
        
         
         <Button type='submit ' variant='primary' className="signinbtn"> Update</Button>
            </Form>    
        
    )}
  </FormContainer>
    </>
)}

export default UserEditScreen