import express from "express";
import {authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile} from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js";


const router = express.Router();     //for using router in react 




// seperate routes are in  usercontrollers,we need to call them here
 
                                       //passed 2 middleawares here as thsi route  is for admin login only
router.route("/").post( registerUser).get(protect,admin, getUsers)  //for registering new user and .get() is for admin to acess users
router.post("/login",authUser)   //for logging in 
router.route("/profile")
.get(protect, getUserProfile)   //used middleware protect for this route for acess by user via token
.put(protect, updateUserProfile) //for updating usin g put request

router.route("/:id").delete(protect, admin ,deleteUser)
.get(protect,admin,getUserById)
.put(protect,admin,updateUser)



export default router