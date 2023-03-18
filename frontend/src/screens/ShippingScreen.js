
import React, { useState } from 'react'
import { Button,  Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../reduxActions/cartActions'


const ShippingScreen = () => {
    const cart= useSelector(state =>state.cart)
    const{shippingAddress} = cart
    const navigate = useNavigate()

   //set initial states so that we can show old saved adresses,cities etc to user ,incase they wat to use it
    const [address,setAddress] = useState(shippingAddress.address) 
    const [city,setCity] = useState( shippingAddress.city)
    const [postalCode,setPostalCode] = useState( shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country )
    const dispatch = useDispatch()
  
const submitHandler=(e)=>{
 e.preventDefault()
 //console.log("submit")
 dispatch(saveShippingAddress({address,city,postalCode,country}))
 navigate("/payment")

}

  return <FormContainer>     
    <CheckoutSteps step1 step2></CheckoutSteps>    {/*all previous steps and present step */}
      <h1>Shipping</h1>
    <Form onSubmit={submitHandler}>
        {/* //for adress entering */}
       <FormGroup controlId='address'>
        <FormLabel className='email'>Address</FormLabel>
         <FormControl
         type='text'
         placeholder='Enter Address'
         value ={address}
         required
         onChange={(e)=>setAddress(e.target.value)}>
         </FormControl>
      </FormGroup>
      {/* //for entering city */}
      <FormGroup controlId='city'>
       <FormLabel className='pasword'>City</FormLabel>
        <FormControl
        type='text'
        placeholder='Enter City'
        value ={city}
        required
        onChange={(e)=>setCity(e.target.value)}>
        </FormControl>
     </FormGroup> 

   {/* //for entering postalcode */}
   <FormGroup controlId='postalCode'>
    <FormLabel className='pasword'>PostalCode</FormLabel>
     <FormControl
     type='text'
     placeholder='Enter postal code'
     value ={postalCode}
     required
     onChange={(e)=>setPostalCode(e.target.value)}>
     </FormControl>
   </FormGroup>

 {/* //for entering country */}
 <FormGroup controlId='country'>
  <FormLabel className='pasword'>Country</FormLabel>
   <FormControl
   type='text'
   placeholder ='Enter Country'
   value ={country}
   required
   onChange={(e)=>setCountry(e.target.value)}>
   </FormControl>
</FormGroup>

<Button type='submit' variant='primary' className="signinbtn">Continue</Button>
      
    </Form>
  </FormContainer>
   
  
}

export default ShippingScreen