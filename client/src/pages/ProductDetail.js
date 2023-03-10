import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProducts] = useState([]);

  //initial period
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* {JSON.stringify(product,null,4)} */}

      <div className="row container mt-2">
        <div className="col-md-6">
          image
          <img
            src={`/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            // style={{height: '10rem', width: '10rem'}}
            alt={product.name}
            height="300"
            width={"300px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className=" text-center">Product Details</h1>
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>price: {product.price}</h4>
          <h4>category: {product.category?.name}</h4>
          <button class="btn btn-secondary ms-1">Add to Cart</button>
          {/* <h4>shipping: {product.shipping}</h4> */}
        </div>
      </div>
      <hr />

      <div className="row container">
        <h6>Similar Products  </h6>
        {relatedProduct.length < 1 && (<p className="text-center">No similar product found</p>)}
            {/* {JSON.stringify(relatedProduct,null,4)} */}
            <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <div className="card m-2" style={{ width: "37rem" }}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
       
      </div>
    </Layout>
  );
};

export default ProductDetail;
