import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css';       // imported  theme for bootstrap from bootswatch 
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  //provider passes store as prop to our app for giving acess to store 
  <Provider store ={store}>    
    <App />
  </Provider>
);
  


// used react bootstrap for components ,react bootstrap is bootstrap made for react. see its doc
// used bootswatch .com ;for  free themes of bootstrap like for  nav bar etc
// cdnjs.com; website to load  diff library files on our projects like font awesome etc we just search here and bring links directly
//"server":"nodemon backend/server", 
//"client":"npm start --prefix frontend" it is written in  package  json of root so if we write "npm run server" backend will run and if we write 
//"npm run start" front end will run 
//but we want run them concurrently then only products will gets displayed on frontend as they are fetched from frontend
//for that we write this after installing concurrently
//"dev":"concurrently \"npm run server\"\"npm run client\"" and then write "npm run dev simply in terminal and both ends will run"
