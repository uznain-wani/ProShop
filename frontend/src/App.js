import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';     //for react routing
import{Container} from 'react-bootstrap';    // importing  diff bootstrap components from react bootstrap
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import    UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';

// axios is http library that enables us to fetch data from backend  to acess it it front end

function App() {
  return (
     <Router> 
       <Header/>
       
        <main  className='py-3'>  {/*py-3 is the class of react bootstrap */}
      
          <Container>               {/*container  brings everything in center */}
 {/* instead of writing <HomeScreen/> we specified here react router which will route us to homescreen component directly on path"/"*/}
      <Routes>
        <Route  path="/" element={<HomeScreen/>} exact />
        <Route  path="/page/:pageNumber" element={<HomeScreen/>} exact />
        <Route  path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>} exact />
        <Route  path="/search/:keyword" element={<HomeScreen/>} exact />
        <Route  path="/product/:id" element={<ProductScreen/>}  />
        <Route  path="/login" element={<LoginScreen/>}  />
        <Route  path="/cart/:id?" element={<CartScreen/>}  />
        <Route  path="/admin/userlist" element={<UserListScreen/>}  />
        <Route  path="/admin/productlist" element={<ProductListScreen/>} exact />
        <Route  path="/admin/productlist/:pageNumber" element={<ProductListScreen/>} exact  />
        <Route  path="/admin/orderlist" element={<OrderListScreen/>}  />
        <Route  path="/admin/user/:id/edit" element={<UserEditScreen/>}  />
        <Route  path="/admin/product/:id/edit" element={<ProductEditScreen/>}  />
        <Route  path="/register?" element={<RegisterScreen/>}  />
        <Route  path="/profile" element={<ProfileScreen/>}  />
        <Route  path="/shipping" element={<ShippingScreen/>}  />
        <Route  path="/payment" element={<PaymentScreen/>}  />
        <Route  path="/placeorder" element={<PlaceOrderScreen/>}  />
        <Route  path="/order/:id" element={<OrderScreen/>}  />


      </Routes>
          </Container>
        </main> 
                                                 
       <Footer/>
     </Router>
 
  );
}

export default App;
