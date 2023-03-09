import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Productss = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Some went wrong in products_s");
    }
  };

  //life cycle mehod
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"All products"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "27rem" }}>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{height: '10rem', width: '10rem'}}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productss;
