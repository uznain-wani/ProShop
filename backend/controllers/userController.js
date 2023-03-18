//controles    different routes in   userroute.js
import Product from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//authenticate user and get token back
// post request to  /api/users/login
// public acess  for logging in
//taking details from user of username nad password and checking it out from dbase  for logging him in

const authUser = asyncHandler(async (req, res) => {
  //  const email = req.body.email   //this is also correct

  const { email, password } = req.body; //we  can destructure it also and take out email and passowrd from body that user typed to check it out
  const user = await User.findOne({ email: email }); //matching emails

  //  we also need to match password which will be in numbers and to compare it with our dbase encrypted password,we first becrypt our encrypted password of dbase
  //for becryption we created function in user model matchpassword()
  if (user && (await user.matchPassword(password))) {
    //email matches and password also matches

    res.json({
      //we can this data in userreducer in userinfo via action
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), //user can use this token  to acess protected routes like his profile
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//route for registering new user
//POST request to /api/users
//public route

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    //if user is created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// getting user profile via his token when he logs in
//GET request for /api/users/profile
//private route
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//update user profile using put request which updates whole thing rather than patch it
//PUT request /api/users/profile
//private route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name), //set user name to new name by req.body.name or keep it oldone
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save(); //saved updated user

    res.json({
      // this data is returned via payload then
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("user not found");
  }
});

// getting  all users particularly for  admin
//GET request for /api/users
//private route ,you have to login as well ushould be admin then u can acess this route
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); //{} empty object gives all users
  res.json(users);
});

// delete a user
//DELETE request for /api/users/:id
//private route ,in which only admin can delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //{} empty object gives all users
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// get user by ID
//GET request for /api/users/:id
//private route for admin only
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); //password will be excluded
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//update User route
//PUT request /api/users/:id
//private route for admin only for updating
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    (user.name = req.body.name || user.name), //set user name to new name by req.body.name or keep it oldone
      (user.email = req.body.email || user.email);
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save(); //saved updated user

    res.json({
      // this data is returned via payload then
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
