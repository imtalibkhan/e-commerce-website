import express from "express";
import { loginController, registerController,forgotPasswordController, getOrdersController, getAllOrdersController, orderStatusController} from "../controllers/authController.js"
import { testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { updateProfileController } from './../controllers/authController.js';

//router object
const router = express.Router()


//routings
// register => method = post
router.post ('/register', registerController)

// login route=>post 
router.post('/login',loginController)

// forgot password
router.post('/forgot-password', forgotPasswordController)

//testing routes
router.get('/test',requireSignIn, isAdmin, testController)

//private protected route auth for user
router.get('/user-auth', requireSignIn, (req,res)=> {
    res.status(200).send({ok:true});
})


//private protected route auth for admin
router.get('/admin-auth', requireSignIn,isAdmin, (req,res)=> {
    res.status(200).send({ok:true});
})

//update profile
router.put('/profile', requireSignIn,updateProfileController)




//orders
router.get("/orders", requireSignIn, getOrdersController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);






export default router