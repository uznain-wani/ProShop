import React from 'react'
import { Card } from 'react-bootstrap'
import{Link} from 'react-router-dom'    //in react routing <a> is not used intead <link> is used so that on clicking that link  it dosent show loading but directly goes to that component
import Rating from './Rating.js'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
{/* wrapped image in link inorder to use this in react router,Also used js template literals here which enable concatenating variables and strings easily */}
         <Link to={`/product/${product._id}`}>      {/* it will show product id in url upon clicking it */}
         <Card.Img src={product.image} variant='top'/>
        </Link>

       <Card.Body>

          <Link to ={`/product/${product._id}`}>   
            <Card.Title as ='div'>
            <strong>{product.name}</strong>
            </Card.Title> 
          </Link>
           <Card.Text as ='div'>
             <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            
            
           </Card.Text>

           <Card.Text as ='h3'> ${product.price} </Card.Text>

         </Card.Body>
    </Card>
  )
}

export default Product


