import Product from "../models/productModel.js"  
import  asyncHandler  from "express-async-handler" ;   // instead of try catch we use this for catching error  in any route easily



// for   fetching all products
//route is /api/products
//this is public route 

const getProducts = asyncHandler(async (req,res)=>{

  // for pagination so that all our products do not show in the same page 
 const pageSize = 10                   //perpage products displayed
 const  page = Number(req.query.pageNumber) || 1     //getting pagenumber on which user is


//for adding search functionality above 
   const keyword = req.query.keyword ? {
    name:{
      $regex :req.query.keyword,
      $options:"i"
    }
   }:{}
    
   const count = await Product.countDocuments({...keyword})       //getting count of products 
    const products = await Product.find({...keyword}).limit(pageSize).skip(     //  limits products acc to page size
      pageSize * (page  -  1)
    )      



   res.send({products,page,pages:Math.ceil(count/pageSize)})

})


// for fetching a particular product
 //route is /api/product/:id
 //this is public route

const getProductById = asyncHandler(async (req,res)=>{

    const product = await  Product.findById(req.params.id) //finds that id along with product
 if (product){
     res.json(product)      // res.send(product) is also correct
 }else{

   //.0  throwing our custom error 
     res.status(404)  //it will be 500 by default via custom error handler but we it to be 404
     throw new  Error ("Product not found")   //by custom error handler
 }
 
})

// for deleting a particular product by admin only
 //delete rquest to  /api/products/:id
 //this is private route to admin 

 const deleteProduct = asyncHandler(async (req,res)=>{

    const product = await  Product.findById(req.params.id) //finds that id along with product
 if (product){
   await  product.remove()
   res.json({message: "Product Removed"})
 }else{

   //.0  throwing our custom error 
     res.status(404)  //it will be 500 by default via custom error handler but we it to be 404
     throw new  Error ("Product not found")   //by custom error handler
 }
 
})

// for creating  a  product by admin only
 //post rquest to  /api/products
 //this is private route to admin 

 const createProduct = asyncHandler(async (req,res)=>{

  const product = new Product({
     name:"sample name",
     price:0,
     user:req.user._id,
     image:"/images/sample.jpg",
     brand:"sample brand",
     category:"sample category",
     countInStock:0,
     numReviews:0,
     description:"sample description",
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

})

// for updating  a  product by admin only
 //put rquest to  /api/products/:id
 //this is private route to admin 

 const updateProduct = asyncHandler(async (req,res)=>{
  const {name,price,description,image,brand,category,countInStock}= req.body
  const product = await Product.findById(req.params.id)

  if(product){

    product.name =name
    product.image =image
    product.brand =brand
    product.description =description
    product.category =category
    product.countInStock = countInStock
    product.price = price

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }else{
    res.status(404)  
    throw new  Error ("Product not found") 
  }

})

// for adding a  new review for product
 //post rquest to  /api/products/:id/reviews
 //this is private route to users 

 const createProductReview = asyncHandler(async (req,res)=>{
  const {rating,comment}= req.body

  const product = await Product.findById(req.params.id)   //finds product

  if(product){
  const  alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
  if(alreadyReviewed){
    res.status(400)  
    throw new  Error ("Product  already reviewed") 
     }
  
  const review ={
    name:req.user.name,
    rating:Number(rating),
    comment,
    user:req.user._id
  }

  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.rating = product.reviews.reduce((acc,item)=> item.rating + acc, 0)/product.reviews.length

  await product.save()
  res.status(201).json({message:"Review added"})

    
  }else{
    res.status(404)  
    throw new  Error ("Product not found") 
  }
 })

// for getting top rated products
 //post rquest to  /api/products/top
 //this is a public route 

 const getTopProducts = asyncHandler(async (req,res)=>{
 const products = await Product.find({}).sort({rating:-1}).limit(3)

 res.json(products)

 })
export {getProducts,getProductById,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts}

