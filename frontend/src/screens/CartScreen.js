import React ,{useEffect} from 'react'
import {Row,Col,ListGroup,Image,Button,Card, ListGroupItem, FormControl} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart,removeFromCart } from '../reduxActions/cartActions';
import Message from "../components/Message.js"



const CartScreen = () => {

  let navigate = useNavigate()  
  const {id} = useParams()
 const location = useLocation()   //gives us ?qty= of product like ?qty=1 
  
 const qty = location.search ? Number(location.search.split("=")[1]) :1  //we only want number in ?qty=1
 //const [searchParams] = useSearchParams();
 //const qty =searchParams.get("qty")
 //console.log(qty)
  
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems } = cart

  
  useEffect(()=>{
   // if there is productid in url which we kept  when we want to add something to cart then only disptach addToCart action
   //console.log(qty)

   if (id){

    
    dispatch( addToCart(id,qty) )
   }
  },[dispatch,id,qty])


   const removeFromCartHandler=(id)=>{
    console.log("checkout")
    dispatch(removeFromCart(id))
   }
   
   
   
   const checkOutHandler =() =>{

    //console.log("checkout")
    navigate("/login?redirect=/shipping")        // means if logged in go to shipping page else go to login
   }

   
  return  <Row>
    <Col md ={8} >
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?<Message>Your Cart Is Empty <Link to ="/">Go Back</Link></Message>:(
          <ListGroup variant ="flush">
            {cartItems.map((item)=>(
              <ListGroupItem key ={item.product}>
                <Row>
                  <Col md={2}>
                    <Image  src={item.image} alt ={item.name} fluid rounded/>
                  </Col>
                  <Col md ={3}>
                    <Link to = {`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                  <FormControl  as="select" value={item.qty} onChange={(e) =>dispatch(addToCart(item.product,Number(e.target.value)))}>

                         {[...Array(item.countInStock).keys()].map((x) => (
                             <option key ={x+1} value={x+1}>
                                {x+1}                 {/* as in array items start from 0} */}
                             </option>
                           ))}
                       </FormControl> 
                  </Col>
                  <Col md={2}>
                  <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
             
                  </Col>
                </Row>

              </ListGroupItem>

            ))}

          </ListGroup>
        )}

    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant= "flush">
          <ListGroupItem>
          {/* //for adding quantities  we use reduce(accumulator,cuurentitem) */}
            <h2> SubTotal ({cartItems.reduce((acc,item) =>acc + item.qty,0)})
            Items</h2> 
            $
            {cartItems.reduce((acc,item) => acc + item.qty * item.price ,0).toFixed(2) }
          </ListGroupItem>
          <Button type='button' variant="primary" size="md" className='cartbtn' disabled={cartItems.length===0} onClick ={checkOutHandler}>
            Proceed To Checkout
          </Button>
          <ListGroupItem>
             

             
          </ListGroupItem>

        </ListGroup>


      </Card>

    </Col>
  


  </Row>
   
  
   
  
}

export default CartScreen