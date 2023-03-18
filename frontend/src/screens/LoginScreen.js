import React, { useState,useEffect } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../reduxActions/userActions'


const LoginScreen = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const location = useLocation()
    let navigate = useNavigate();


    const dispatch =useDispatch()

    const userLogin = useSelector(state =>state.userLogin)
    const{loading,error,userInfo} = userLogin

    const redirect = location.search ? location.search.split("=")[1]: "/" 
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }

    },[navigate,userInfo,redirect])
 
    
    const SubmitHandler = (e) =>{
        e.preventDefault()  //for disbaling refreshing of page
        //dispatch login
        dispatch(login(email,password))
    }

  return  <FormContainer>
    <h1>Sign In</h1>
    {error && <Message variant="danger">{error}</Message>}
    { loading && <Loader/> }
    <Form onSubmit={SubmitHandler}>
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
 

 <Button type='submit ' variant='primary' className="signinbtn"> Sign In</Button>
    </Form>
  
  <Row  className="py-3">
    <Col>
       New Customer ? {" "}<Link  to={redirect ?`/register?redirect=${redirect}`:"/register"}>Register</Link>
    </Col>
  </Row>


  </FormContainer>
  
}

export default LoginScreen