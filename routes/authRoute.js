import express from "express";
import {loginController, registerController} from "../controllers/authController.js"
import { testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router()


//routings
// register => method = post
router.post ('/register', registerController)

// login route=>post 
router.post('/login',loginController)

//testing routes
router.get('/test',requireSignIn, isAdmin, testController)

export default router