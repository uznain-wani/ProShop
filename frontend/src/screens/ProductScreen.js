import React from 'react'
import{Link,useParams,useNavigate, } from 'react-router-dom'
import {Row,Col,Image,Card,ListGroup,Button, ListGroupItem, FormControl, FormGroup, FormLabel,Form} from 'react-bootstrap'
import Rating from '../components/Rating.js'   //here we will also bring particular product from backend using axios
import Meta from '../components/Meta.js'
import {useState, useEffect } from 'react'
import {useDispatch,useSelector}  from "react-redux"
import { listProductDetails ,createProductReview } from '../reduxActions/productActions.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../reduxConstants/productContants.js'


    const ProductScreen = () => {
   // for quantity select in cart we will use local state
   const [qty,setQty] = useState(1)
   const [rating,setRating] = useState(0)
   const [comment,setComment] = useState("")
 

   let navigate = useNavigate();   //to go to  cart page
    const params = useParams();     //useparams() will return dynamic root in url along with id

    const dispatch =useDispatch()

    const productDetails = useSelector(state=>state.productDetails)     
    const {loading ,error,product}  = productDetails       //what we want from productdetails state        

    const productReviewCreate = useSelector(state=>state.productReviewCreate)
   const {success:successProductReview ,error:errorProductReview,}  = productReviewCreate  
   
   const userLogin = useSelector(state=>state.userLogin)
   const {userInfo}  = userLogin    

   useEffect(()=>{
    if(successProductReview){
      alert("Review Submitted!")
      setRating(0)
      setComment( "")
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})

    }
    dispatch( listProductDetails(params.id))     //we want id here 

  },[dispatch,params,successProductReview]);
    
  //will take u to cart screen upon button click and url will be shown as per this
  
  const addToCartHandler = ()=>{
    navigate(`/cart/${params.id}?qty=${qty}`)    // id and qty of item will be in url ,if we push anyitem in cart
  }
  const submitHandler =(e) =>{
   e.preventDefault()
   dispatch(createProductReview(params.id,{rating,comment}))
  }
   return (
   <>
    <Link className='btn btn-light my3' to='/'>Go Back</Link>   {/* this button will take you to root that is homepage */}
    {loading ? <Loader/>: error ? <Message variant="danger"/> :(
    <>
    {/* <Meta title ={product.name} />     for showing product  name in title above */}
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name}  fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                     <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>
                    Price:${product.price}
                </ListGroupItem>
            <ListGroupItem>
                Description:{product.description}
            </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <Row>
                            <Col>
                            Price:
                            </Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                   <Row>
                       <Col>
                       Status:
                       </Col>
                       <Col>
                  {product.countInStock > 0 ? "In Stock":"Out Of Stock"}
                       </Col>
                       </Row>
                   </ListGroupItem>

                    {product.countInStock > 0 && (
                     <ListGroupItem>
                        <Row>
                            <Col> Qty</Col>
                            <Col>
                            <FormControl  as="select" value={qty} onChange={(e) =>setQty (e.target.value)}>

     {/* made an array of countinstock like[0,1,2,3] and mapped via that ,for each item displayed qty in options as per that  */}
                              {[...Array(product.countInStock).keys()].map((x) => (
                                  <option key ={x+1} value={x+1}>
                                     {x+1}                 {/* as in array items start from 0} */}
                                  </option>
                                ))}
                            </FormControl> 


                            </Col>
                        </Row>
                     </ListGroupItem>

                    )}
                   <ListGroupItem>

    <Button onClick={addToCartHandler} variant="primary" size="md" type='button' disabled={product.countInStock ===0}>Add To Cart</Button>

                   </ListGroupItem>
                 </ListGroup>
            </Card>

        </Col>
    </Row>
    <Row>
     <Col md={6}>
        <h2>Reviews</h2>
        {product.reviews.length === 0 && <Message>No Reviews</Message>}
        <ListGroup variant ="flush">
            {product.reviews.map((review) =>(
                <ListGroupItem key ={review._id}>
                 <strong>{review.name}</strong>
                < Rating value= {review.rating}/>
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comment}</p>
                </ListGroupItem>
            ))}
            <ListGroupItem>
                <h2>Write a Customer Review</h2>
                {errorProductReview && <Message variant ="danger">{errorProductReview}</Message>}
                {userInfo ?(<Form onSubmit= {submitHandler}>
                    <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <FormControl as="select" value={rating} onChange ={(e)=>setRating(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='comment'>
                      <FormLabel>Comment</FormLabel>
                      <FormControl as ="textarea" row ="3" value ={comment} onChange={(e)=>setComment(e.target.value)}></FormControl>
                      <Button type='submit' variant='primary'>Submit</Button>

                    </FormGroup>
                </Form>):
                (<Message> Please <Link to="/login">Sign In</Link> to write a review</Message>)}
            </ListGroupItem>
        </ListGroup>
     </Col>
 </Row>
    </>
    )}     
   </>
   )    
}


export default ProductScreen