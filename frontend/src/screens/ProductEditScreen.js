import React, { useState,useEffect } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link,  useNavigate,    useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct, } from '../reduxActions/productActions'
import { PRODUCT_UPDATE_REQUEST } from '../reduxConstants/productContants'
import axios from "axios"



const ProductEditScreen = () => {
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState("")
    const [brand,setBrand] = useState("")
    const [category,setCategory] = useState("")
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState("")
    const [uploading,setUploading] = useState(false)

    const params = useParams()
    const productId = params.id
    const navigate = useNavigate()

    const dispatch =useDispatch()

    const productDetails = useSelector(state =>state.productDetails)
    const{loading,error,product} = productDetails

    const productUpdate = useSelector(state =>state.productUpdate)
    const{loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate
    
    
    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_REQUEST})
            navigate("/admin/productlist")
          }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
          }},[dispatch, navigate,productId,product,successUpdate])

    const uploadFileHandler = async(e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image",file)
        setUploading(true)

       try {
        const config={
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const {data} = await axios.post("/api/upload", formData ,config)

        setImage(data)
        setUploading(false)

       } catch (error) {
         console.log(error)
         setUploading(false)
       }
    }
 
    
    const SubmitHandler = (e) =>{
        e.preventDefault()  //for disbaling refreshing of page
     //update product action 
     dispatch(updateProduct({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,       
     }))

    }

  return ( 
    <>
      <Link to= "/admin/productlist" className='btn btn-light  my-3'> Go Back</Link>

      <FormContainer>
    <h1>Edit Product</h1>
    {loadingUpdate  &&<Loader/>}  {/* means if loading update show loader*/}
    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
        
             {/* for price */}
                <FormGroup controlId='price'>
                    <FormLabel   className="pasword">Price</FormLabel>
                    <FormControl
                    type='number'
                    placeholder='Enter Price'
                    value ={price}
                    onChange={(e)=>setPrice(e.target.value)}>
                    </FormControl>
                </FormGroup>
                
            {/* for image */}
            <FormGroup controlId='image'>
            <FormLabel   className="pasword">Image</FormLabel>
               <FormControl
               type='text'
               placeholder='Enter image url'
               value ={image}
               onChange={(e)=>setImage(e.target.value)}>
               </FormControl>
               {/* for uploading file in image url */}
               {/* <FormControl name="images[]" type="file" multiple onChange={this.handlePhotos}/> */}
               <FormControl  type="file" label = "Choose File" custom ="true"  onChange={uploadFileHandler}/> 
               {uploading && <Loader/>} 

               </FormGroup>

                 
             {/* for brand */}
             <FormGroup controlId='brand'>
             <FormLabel   className="pasword">Brand</FormLabel>
                <FormControl
                type='text'
                placeholder='Enter brand'
                value ={brand}
                onChange={(e)=>setBrand(e.target.value)}>
                </FormControl>    
              </FormGroup>

         
             {/* for category */}
             <FormGroup controlId='category'>
             <FormLabel   className="pasword">Category</FormLabel>
                <FormControl
                type='text'
                placeholder='Enter category'
                value ={category}
                onChange={(e)=>setCategory(e.target.value)}>
                </FormControl>    
                </FormGroup>
                  
             {/* for countinstock */}
             <FormGroup controlId='countInStock'>
             <FormLabel   className="pasword">Count In Stock</FormLabel>
                <FormControl
                type='number'
                placeholder='Enter countInStock'
                value ={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}>
                </FormControl>    
                </FormGroup>
                 
             {/* for description*/}
             <FormGroup controlId='description'>
             <FormLabel   className="pasword">Description</FormLabel>
                <FormControl
                type='text'
                placeholder='Enter description'
                value ={description}
                onChange={(e)=>setDescription(e.target.value)}>
                </FormControl>    
                </FormGroup>
        
         
         <Button type='submit ' variant='primary' className="signinbtn"> Update</Button>
            </Form>    
        
    )}
  </FormContainer>
    </>
)}

export default ProductEditScreen