import React, { useState,useEffect } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../reduxActions/userActions'


const RegisterScreen = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState(null)

    const location = useLocation()
    let navigate = useNavigate();


    const dispatch =useDispatch()

    const userRegister = useSelector(state =>state.userRegister)
    const{loading,error,userInfo} = userRegister

    const redirect = location.search ? location.search.split("=")[1]: "/" 
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }

    },[navigate,userInfo,redirect])
 
    
    const SubmitHandler = (e) =>{
        e.preventDefault()  //for disbaling refreshing of page
        //dispatch register action
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }else {
       dispatch(register(name,email,password))}
    }

  return  <FormContainer>
    <h1>Sign Up </h1>
    {error && <Message variant="danger">{error}</Message>}
    {message && <Message variant="danger">{message}</Message>}
    { loading && <Loader/> }
    <Form onSubmit={SubmitHandler}>
        {/* //for name */}
    <FormGroup controlId='name'>
    <FormLabel className='email'>Name</FormLabel>
    <FormControl
    type='name'
    placeholder='Enter Your Name'
    value ={name}
    onChange={(e)=>setName(e.target.value)}>
    </FormControl>
     </FormGroup>

     {/* for email form group  */}
        <FormGroup controlId='email'>
            <FormLabel className='email'>Email Address</FormLabel>
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
 

 <Button type='submit ' variant='primary' className="signinbtn"> Register</Button>
    </Form>
  
  <Row  className="py-3">
    <Col>
       Have an Account? {" "}<Link  to={redirect ?`/login?redirect=${redirect}`:"/login"}>Login</Link>
    </Col>
  </Row>


  </FormContainer>
  
}

export default RegisterScreen