import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";

import braintree from "braintree";

import  dotenv  from 'dotenv';






dotenv.config();


//payment gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});








export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "photo && photo.size > 100000 is required" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "products created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while creating a products",
    });
  }
};

// get all products

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: " ALL products getting successfully",
      countTotal: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,

      message: "Error while getting all products",
      error: error.message,
    });
  }
};

// get single products

export const getSingleProductsController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "  getting  single product successfully",

      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while geting single products",
    });
  }
};

//get photo

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(201).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photos",
      error,
    });
  }
};

// delete Product controller

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "   product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Deleting Products",
      error,
    });
  }
};

//update updateProductController

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      case photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "photo && photo.size > 1000000 is required" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "products Updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while update products",
    });
  }
};

//filter contrller

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in filter ",
      error,
    });
  }
};

//product count

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count ",
      error,
    });
  }
};

//product lilst bast on page

// export const productListController = async (req,res) => {
//   try {
//     const perPage = 6;
//     const page = req.params.page ? req.params.page : 1;
//     const products = await productModel
//       .find({})
//       .select("-photo")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort({ createdAt: -1 });
//       res.status(200).send({
//         success: true,
//         products,
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error in product list page ",
//       error,
//     });
//   }
// };

export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//search prodyc

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in Serach product",
      error,
    });
  }
};

//similar product

export const relatedProductController = async (req,res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(first);
    res.status(400).send({
      success: false,
      message: "error in Similar product",
      error,
    });
  }
};



// get product by category

export const productCategoryController= async(req,res) => {

  try {
    const category = await categoryModel.findOne({slug:req.params.slug})

const products = await productModel.find({category}).populate('category')
res.status(200).send({
  success: true,
  category,
  products
});
    
  } catch (error) {
    console.log(error)
    console.log(first);
    res.status(400).send({
      success: false,
      error,
      message: "error while Getting products",
      
    });
  }
}



//payment gateway api
//token
export const braintreeTokenControlller = async(req,res) => {

  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }

}

//payment
export const braintreePaymentController =async(req,res) => {

  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

}


