import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductsController,
  productFilterController,
  productPhotoController,
  updateProductController,
} from "./../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//updat products
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products

router.get("/get-product", getProductController);

//single products
router.get("/get-product/:slug", getSingleProductsController);

//get photo

router.get("/product-photo/:pid", productPhotoController);

// delete products

router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post('/product-filters',productFilterController)

export default router;
