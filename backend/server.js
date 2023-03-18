// "type":"module", write this in package jason of root for using import syntax in  express

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js"; //other routes such   as /api/products
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import path from "path";
import morgan from "morgan";

dotenv.config();
const app = express();

//morgan is a request logger middleware ,so that when user hits any route of app we can see deatils of that  route in our console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// will allow us to accept json data in body like login details by user just like we use body parser and we can acess it via req.body.email etc in post route

app.use(express.json()); //enables use of req.body.password etc in post route of login details

connectDB();

app.get("/", function (req, res) {
  res.send("API  is running......");
});

// for anyone that goes to /api/routes is going to be linked to productRoutes

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID); //payment route via paypal
});
//for passing static files like uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//custom error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; //for acessing port from .env file or simply 5000 incase .env is not aceessed

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV}  mode on port ${PORT}`
  )
);

// we run our Server.js by writing in terminal "node backend/server" but by  writing this {"scripts": {  "start":"node backend/server" }
//   in package json we  can simply now write npm start
