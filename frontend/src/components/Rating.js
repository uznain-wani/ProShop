import React from 'react'
import propTypes  from 'prop-types'

const Rating = ({value,text,color}) => {
  return (
    <div className='rating'>
        <span>
            {/* fontawesome icons classes imported here and stars shown as per rating value*/}
          <i style={{color:color}} className={value >=1 ? 'fas fa-star': value>=0.5 ?'fas fa-star-half-alt':'far fa-star'}></i>
        </span>
        <span>
     <i style={{color:color}} className={value >=2 ? 'fas fa-star': value>=1.5 ?'fas fa-star-half-alt':'far fa-star'}></i>
       </span>
       <span>
     <i style={{color:color}} className={value >=3 ? 'fas fa-star': value>=2.5 ?'fas fa-star-half-alt':'far fa-star'}></i>
       </span>
       <span>
           <i  style={{color:color}} className={value >=4 ? 'fas fa-star': value>=3.5 ?'fas fa-star-half-alt':'far fa-star'}></i>
       </span>
       <span>
           <i style={{color:color}}  className={value >=5 ? 'fas fa-star': value>=4.5 ?'fas fa-star-half-alt':'far fa-star'}></i>
       </span>
       <span>{text ? text: ""}</span>
    </div>
  )
}
// we passed default color value  as yellow so that if user didn pass any colour as props it will always be default yellow though  we can pass  also pass any color as props in  products .js  as < rating color={red}>
Rating.defaultProps ={
    color:"#f8e825",
}
// it will make passing props values as mentioned e-g it wont accept value as a string but only number or text as anumber but only string
Rating.propTypes={
    value:propTypes.number.isRequired, 
    text:propTypes.string.isRequired,
    color:propTypes.string,
}

export default Rating