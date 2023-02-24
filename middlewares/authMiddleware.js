import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// here we need to protect the users  protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;  // kjhfimp gfhjfjidwle sce
    next();
  } catch (error) {
    console.log(error);
  }
};


//admin access functions 
export const isAdmin = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id) // in login controller we passed the user 
        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unAuthorized admin"

            })
        } else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "error in admin middleware"
        })
    }
}


