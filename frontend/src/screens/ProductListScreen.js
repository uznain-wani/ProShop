import React, { useEffect } from 'react'
import { Button, Table,Row ,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createProduct, deleteProduct, listProducts } from '../reduxActions/productActions'
import { PRODUCT_CREATE_RESET } from '../reduxConstants/productContants'
import Paginate from '../components/Paginate'

const ProductListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const pageNumber = params.pageNumber || 1

    const productList = useSelector(state =>state.productList)
    const {loading,error,products, page,pages} = productList

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state =>state.productDelete)
     const {loading:loadingDelete ,error:errorDelete ,success:successDelete} = productDelete

     const productCreate = useSelector(state =>state.productCreate)
     const {loading:loadingCreate ,error:errorCreate ,success:successCreate,product:createdProduct} = productCreate

    useEffect(() => {
       dispatch({type: PRODUCT_CREATE_RESET})
       
        if(!userInfo && userInfo.isAdmin){  //if logged in and also admin then only dispatch users list
          navigate("/login")
        }
        if(successCreate){
          navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
          dispatch(listProducts("",pageNumber))
        }
     
    }, [dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,pageNumber])

    const deleteHandler =(id)=>{
     if(window.confirm("Are you Sure?")){
      dispatch(deleteProduct(id))
    }
  }
   const createProductHandler =()=>{
     //create product
    dispatch(  createProduct())

   }
  return (
    <>
    <Row className='align-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-right'>
        <Button className=' productbtn float-end' onClick={createProductHandler}>
          <i className=' fas fa-plus'></i>
          Create Product 
        </Button>
      </Col>
    </Row>
    {loadingDelete && <Loader/>}
    {errorDelete && <Message variant ="danger">{errorDelete}</Message>}
    {loadingCreate && <Loader/>}
    {errorCreate && <Message variant ="danger">{errorCreate}</Message>}
    {loading ? <Loader/> : error ? <Message variant ="danger">{error}</Message>:(
      <>
      <Table striped bordered hover responsive size ='sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
            </tr>
        </thead> 
        <tbody>
           {products.map(product =>(
            <tr key ={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price} </td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to ={`/admin/product/${product._id}/edit`}>
                 <Button variant ="light" className='btnn' size="sm"><i className="fa-solid fa-pen-to-square"></i></Button>
                </LinkContainer>
            <Button variant='danger'  className='btnn' size="sm"    onClick={()=> deleteHandler(product._id)}>
            <i className="fa-solid fa-trash"></i>
            </Button>
            </td>
            </tr>
           ))}
        </tbody>
      </Table>
      <Paginate  pages ={pages} page ={page} isAdmin= {true}/>
      </>
    )}
    </>
  )
}

export default ProductListScreen