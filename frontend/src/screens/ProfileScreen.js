import React, { useState,useEffect } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET } from '../reduxConstants/userConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrders } from '../reduxActions/orderActions'
import { getUserDetails, updateUserProfile } from '../reduxActions/userActions'



const ProfileScreen = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState(null)

   
    let navigate = useNavigate();


    const dispatch =useDispatch()

    const userDetails = useSelector(state =>state.userDetails)
    const{loading,error,user} = userDetails
    
    //tocheck if user is logged in then give him acess to this page
    const userLogin = useSelector(state =>state.userLogin)
    const{userInfo} = userLogin

    //for checking sucess in userupdate
    const userUpdateProfile = useSelector(state =>state.userUpdateProfile)
    const{success} = userUpdateProfile

   //for bringing in reducer inorder to display my orders
    const orderListMy = useSelector(state =>state.orderListMy)
    const{loading:loadingOrders,error:errorOrders,orders} = orderListMy //renamed error and loading as it will show error if it resembles with userdetails selectors


    useEffect(()=>{
        if(!userInfo){   //if not logged in 
            navigate("/login")
        }else{
          console.log(user)
          if(!user || !user.name || success){     //user is from userdetails reducer
              dispatch({type:USER_UPDATE_PROFILE_RESET})
              
              // if user is not there then get it by dispatching userdetails action of getting profile
              dispatch(getUserDetails("profile"))   //here id as arg in getUserDetails(id) action will get replaced with passed profile
              dispatch(listMyOrders())
          
            }else{
     
                setName(user.name)
                setEmail(user.email)
            }
        }

    },[ dispatch,navigate,userInfo,user,success])
 
    
    const SubmitHandler = (e) =>{
        e.preventDefault()  //for disbaling refreshing of page
        //dispatch register action
        if(password != confirmPassword){
            setMessage("Passwords do not match")
        }else {
            //dispatch update profile action here
            dispatch (updateUserProfile({id:user._id,name,email,password}))
    }
    }
  return <Row>
    <Col md={3}>
    <h2>User Profile </h2>
    {error && <Message variant="danger">{error}</Message>}
 {message && <Message variant="danger">{message}</Message>}
 {success && <Message variant="success">Profile Updated</Message>}
 { loading && <Loader/> }
 <Form onSubmit={SubmitHandler}>
     {/* //for name */}
     <FormGroup controlId='name'>
 <FormLabel className='email'>Name</FormLabel>
 <FormControl
 type='name'
 placeholder='Enter Your Name'
 value ={name } 
 onChange={(e)=>setName(e.target.value)}>
 </FormControl>
  </FormGroup>
  {/* for email form group  */}
     <FormGroup controlId='email'>
         <FormLabel className='pasword'>Email Address</FormLabel>
         <FormControl
         type='email'
         placeholder='Enter Email'
         value ={email}
         onChange={(e)=>setEmail(e.target.value)}>
         </FormControl>
     </FormGroup>
{/* //for password */}
<FormGroup controlId='password'>
     <FormLabel className='pasword'>Password</FormLabel>
     <FormControl
     type='password'
     placeholder='Enter password'
     value ={password}
     onChange={(e)=>setPassword(e.target.value)}>
     </FormControl>
 </FormGroup>

 {/* //for confirm password */}
 <FormGroup controlId='confirmPassword'>
     <FormLabel className='pasword'> Confirm Password</FormLabel>
     <FormControl
     type='password'
     placeholder='Confirm password'
     value ={confirmPassword}
     onChange={(e)=>setConfirmPassword(e.target.value)}>
     </FormControl>
 </FormGroup>
 <Button type='submit ' variant='primary' className="signinbtn"> Update</Button>
   </Form>
    
</Col>
 <Col md={9}>
    <h2>My Orders</h2>
    {loadingOrders ? <Loader/> : errorOrders ? <Message variant ="danger"> {errorOrders} </Message> : ( 
        <Table  striped bordered hover responsive size = "sm" >
          <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order =>(
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
            
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10):(<i className="fa-sharp fa-solid fa-xmark" style={{color:"red"}}></i>)}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0,10):(<i className="fa-sharp fa-solid fa-xmark" style={{color:"red"}}></i>)}</td>
                  <td>
                      <LinkContainer to ={`/order/${order._id}`}>
                        <Button variant ="light" className='btnn' size="sm">Details</Button>
                      </LinkContainer>
                  </td>
                </tr>
            ))}
          </tbody>
        </Table>
    )}
 </Col>
 </Row>
}

export default ProfileScreen
