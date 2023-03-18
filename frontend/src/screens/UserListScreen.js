import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteUser, listUsers } from '../reduxActions/userActions'

const UserListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state =>state.userList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state =>state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){  //if logged in and also admin then only dispatch users list
            dispatch(listUsers())
        }else{
            navigate("/login")
            console.log("hello")

        }
     
    }, [dispatch,navigate,successDelete,userInfo])

    const deleteHandler =(id)=>{
     if(window.confirm("Are you Sure?"))
     dispatch(deleteUser(id))
    }
    
  return (
    <>
    <h1>Users</h1>
    {loading ? <Loader/> : error ? <Message variant ="danger">{error}</Message>:(
      <Table striped bordered hover responsive size ='sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
            </tr>
        </thead> 
        <tbody>
           {users.map(user =>(
            <tr key ={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>

              <td> <a href ={`mailto:${user.email}`}>{user.email}</a></td>
              <td>{user.isAdmin ?(<i className="fas fa-check" style={{color:"green"}}></i>):(
                <i className="fa-sharp fa-solid fa-xmark" style={{color:"red"}}></i> 
              ) }</td>

              <td>
                <LinkContainer to ={`/admin/user/${user._id}/edit`}>
                 <Button variant ="light" className='btnn' size="sm"><i className="fa-solid fa-pen-to-square"></i></Button>
                </LinkContainer>
            <Button variant='danger'  className='btnn' size="sm"    onClick={()=> deleteHandler(user._id)}>
            <i className="fa-solid fa-trash"></i>
            </Button>
            </td>
            </tr>
           ))}
        </tbody>
      </Table>

    )}
    </>
  )
}

export default UserListScreen