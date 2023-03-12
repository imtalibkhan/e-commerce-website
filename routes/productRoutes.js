import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenControlller,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductsController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
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

//product count

router.get('/product-count', productCountController)

//product page
router.get('/product-list/:page', productListController)

//search product
router.get('/search/:keyword', searchProductController)


//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product

router.get('/product-category/:slug', productCategoryController)

//payments routes 
//token
router.get('/braintree/token', braintreeTokenControlller)


//payments 

router.post('/braintree/payment', requireSignIn, braintreePaymentController)
export default router;
