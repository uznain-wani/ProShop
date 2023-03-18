import React   from 'react'
import { Row,Col } from 'react-bootstrap'
import {useDispatch,useSelector}  from "react-redux"
import {useEffect } from 'react'
import Message from '../components/Message'
import Product from '../components/Product' 
import { listProducts } from '../reduxActions/productActions'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel' 
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'


 const HomeScreen = () => {
  const params = useParams(); 
  const keyword =  params.keyword
  const pageNumber =params.pageNumber || 1
  //fetching state now from store.js  which we stored in productList key 
   const dispatch =useDispatch()
   const productList = useSelector(state=>state.productList)       //propductlist is from store .js,  aswe want productList part of state
   const {loading ,error,products,page,pages}  = productList                     //which parts of productList  we want 


//useEffect hook  accepts function  as arg which runs everytime as soon as component loads and it enables us fetching data from backend
// axios is http library that enables us to fetch data from backend  to acess it it front end and using axios  we will display products.js from backend in frontends homescreen
 useEffect(()=>{
   dispatch(listProducts(keyword,pageNumber))
 }, [dispatch,keyword,pageNumber]);

  return (
    <>
    {/* <Meta />        //here default props will pass in homescreen */}
    {!keyword ? <ProductCarousel /> :<Link to ="/" className='btn btn-light'></Link>}
    <h1>Latest Products</h1>
    {loading ? <Loader/>: error ? <Message variant="danger"/> :(
    <>
       <Row>
       {products.map((product)=>(
           <Col  key ={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product   product ={product}/>   {/*to acess products in <products/> component we passed it in props*/}
           </Col>
       ))}
       </Row>
       <Paginate pages ={pages} page ={page} keyword ={keyword ? keyword : ""} />
       </>
    ) }

    </>
  )
}

export default HomeScreen



// The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are:
//  fetching data from backend, directly updating the DOM, and timers. useEffect accepts two arguments. function and (optional) dependencies

/*const fetchProducts =async ()=> {
 const res = await axios.get("/api/products")  //axios will get jason data from "/api/products" route in backend and store it in res
 setProducts(res.data );  //final state 
 //add proxy of local host:5000  of backend,in package .json of frontend  so that it will fetch data from   5000
}
fetchProducts();*/

