import React, { useState,useEffect } from 'react'
import {  Row,Col,ListGroup,Image,Card, ListGroupItem, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader.js'
import Message from '../components/Message'
import { deliverOrder, getOrderDetails, payOrder} from '../reduxActions/orderActions'
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../reduxConstants/orderConstants.js'

import axios from "axios"


const OrderScreen = () => {

    const params = useParams(); 
    const orderId = params.id 
    const navigate =useNavigate()
    const [sdkReady,setSdkReady]  = useState(false)     // state for payment sdk 

  const dispatch = useDispatch()

  const orderDetails = useSelector(state =>state.orderDetails)
  const {order,loading,error} = orderDetails

  const orderPay= useSelector(state =>state.orderPay)
  const {loading:loadingPay,success:successPay} = orderPay         //renamed loading to loading pay using :

  const orderDeliver= useSelector(state =>state.orderDeliver)
  const {loading:loadingDeliver,success:successDeliver} = orderDeliver   

  const userLogin= useSelector(state =>state.userLogin)
const {userInfo} = userLogin  //gives us logged in user

  if(!loading){
      //calculate items  price
       const addDecimals =(num)=>{  //will add decimals also
      return Math.round((num*100)/100).toFixed(2)
   }

   order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item)=>acc + item.price * item.qty, 0))
      
  }
  useEffect(() => {
    if(!userInfo){
      navigate("/login")
    }
    //for making request to payment route via paypal using axios
   const addPayPalScript = async() =>{
    const {data:clientId} =await axios.get ("/api/config/paypal")   //getting client id from payapal  from env file

    //dynamically adding payapal script 
    const script = document.createElement("script")  //building new script
    script.type = "text/javascript"
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`  //url needed for including paypal in our app just like bootstrap link
    script.async = true
    script.onload =() =>{
      setSdkReady(true)
    }
    document.body.appendChild(script)
   }
   if(!order || successPay ||successDeliver){     //if not order or sucess pay dispatch it
    dispatch({type:ORDER_PAY_RESET})
    dispatch({type:ORDER_DELIVER_RESET})
    dispatch(getOrderDetails(orderId))


   }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else{
        setSdkReady(true)
      }
   }
   }, [dispatch,orderId,successPay,order,successDeliver])  

  const successPaymentHandler =(paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(orderId,paymentResult))
  }
  const deliverHandler =()=>{
    dispatch(deliverOrder(order))
  }
  

//? represents show 
  return loading ? <Loader/> : error ? <Message variant ="danger">{error}</Message> :<> 
  <h1>Order {order._id}</h1>
  <Row>
      <Col md={8}>
          <ListGroup variant='flush'>
              <ListGroupItem>
                 <h2>Shipping</h2>
                 <p><strong>Name:</strong> {order.user.name}</p>  {/*for populating name and email also*/}
                 <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p> 
                  <p>
                   <strong>Address:</strong>
                   {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, 
                   {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? <Message variant ="success">Delievered on {order.deliveredAt}</Message>:<Message variant ="danger">
                    Not Delivered</Message>}
              </ListGroupItem>
              
              <ListGroupItem>
                 <h2>Payment Method</h2> 
                 <p> <strong>Method:</strong>{order.paymentMethod}</p>
                 {order.isPaid ? <Message variant ="success">Paid on {order.paidAt}</Message>:<Message variant ="danger">
                    Not Paid</Message>}

               </ListGroupItem>
               <ListGroupItem>
                <h2>Order Items</h2>
                  <strong>Method:</strong>
                  {order.orderItems.length===0 ?<Message>Order is empty</Message>:(
                   <ListGroup variant='flush'>
                    {order.orderItems.map((item,index)=>(
                      <ListGroupItem key ={index}>
                      <Row>
                       <Col md ={1}>
                           <Image src={item.image} alt={item.name} fluid rounded/>
                       </Col>
                       <Col>
                        <Link to = {`/product/${item.product}`}>{item.name}</Link>
                       
                       </Col>
                       <Col md={4}>
                       {item.qty} x ${item.price}= ${item.qty * item.price}
                       </Col>
                      </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  )}
              </ListGroupItem>
          </ListGroup>
      </Col>
      <Col  md ={4}>
          <Card>
              <ListGroup variant='flush'>
              <ListGroupItem>
                 <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
             <Row>
              <Col> Items</Col>
              <Col>${order.itemsPrice}</Col>
             </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                 <Col> Shipping</Col>
                 <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
               <Row>
                <Col> Tax</Col>
                <Col>${order.taxPrice}</Col>
               </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                 <Col> Total</Col>
                 <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/>:(
                    <PayPalButton amount={order.totalPrice} onSuccess ={successPaymentHandler}></PayPalButton>
                  ) }
                </ListGroupItem>
              )}
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered  &&(
            <ListGroupItem>
              <Button type ="button" className="btn btn-block" onClick ={deliverHandler}>Mark As Delivered</Button>
            </ListGroupItem>
          )}  
        </ListGroup>
          </Card>
      </Col>
  </Row>
  </>

}

export default OrderScreen