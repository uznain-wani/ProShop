
import React, { useState } from 'react'
import { Form,Button, FormControl} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const[keyword,setKeyword]= useState("")

  const navigate = useNavigate()

  const submitHandler =(e)=>{
    e.preventDefault()
    if(keyword.trim()){
      navigate(`/search/${keyword}`)
    }else{
        navigate("/")
    }
  }

  return (
   <Form onSubmit={submitHandler}>
    <FormControl type='text' name='q' onChange={(e)=> setKeyword(e.target.value)} placeholder="Search Products..." className=' searchbar '>  
    </FormControl>
    <div className='searchbtn'> <Button type='submit' variant='outline-success' className='p-2'>Search</Button></div>
   </Form>
  )
}

export default SearchBox
