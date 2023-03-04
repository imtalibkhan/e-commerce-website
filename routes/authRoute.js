import express from "express";
import { loginController, registerController,forgotPasswordController} from "../controllers/authController.js"
import { testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

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



export default router