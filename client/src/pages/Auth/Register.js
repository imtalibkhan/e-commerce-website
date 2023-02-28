import React from "react";
import Layout from "./../../components/layout/Layout";

const Register = () => {
  return (
    <Layout title="Register E-commerce-App">
      <div className="register">
        <h1>Register Page</h1>
        <form>
          <div className="mb-3">
           
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your name"
            />
          </div>
          <div className="mb-3">
      
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your name"

            />
          </div>
         
          <div className="mb-3">
            
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your password"

              
            />
          </div>
          <div className="mb-3">
          
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your phone number"

            />
          </div>
          <div className="mb-3">
           
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your Address"

            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
