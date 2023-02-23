import express from "express";
import {loginController, registerController} from "../controllers/authController.js"

//router object
const router = express.Router()


//routings
// register => method = post
router.post ('/register', registerController)

// login route=>post 
router.post('/login',loginController)

export default router