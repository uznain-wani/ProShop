
import React, { useState } from 'react'
import { Button,  Form,Col, FormGroup, FormLabel, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../reduxActions/cartActions'


const PaymentScreen = () => {
    const cart= useSelector(state =>state.cart)
    const{shippingAddress} = cart
    const navigate = useNavigate()

    if(!shippingAddress){
        navigate("/shipping")
    }

    const [paymentMethod,setPaymentMethod] = useState( "PayPal")  //paypal will be default payment method
   
    const dispatch = useDispatch()
  
const submitHandler=(e)=>{
 e.preventDefault()
 dispatch(savePaymentMethod(paymentMethod))
 navigate("/placeorder")

}

  return (
  <FormContainer>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>  {/*all previous steps and present step */}
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
         <FormGroup>
            <FormLabel as ="legend" >Select Method</FormLabel>
       
        <Col>
         <FormCheck
          type ="radio" 
          label ="PayPal or Credit Card" 
          id="PayPal"
          name='paymentMethod'
          value="PayPal" 
          checked 
          onChange={(e)=>setPaymentMethod(e.target.value)}>
         </FormCheck>

         <FormCheck 
          type ="radio"
          label ="Paytm" 
          id="Paytm"
          name='paymentMethod'
          value="Paytm" 
          onChange={(e)=>setPaymentMethod(e.target.value)}>
         </FormCheck>
        
        </Col>
        </FormGroup>

<Button type='submit' variant='primary' className="signinbtn">Continue</Button>
      
    </Form>
  </FormContainer>
   
  ) 
}

export default PaymentScreen