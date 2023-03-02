import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../style/AuthStyles.css"

const Login = () => {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, phone, address);
        // toast.success("register succesfully");
    
        try {
          const res = await axios.post("/api/v1/auth/login", {
           
            email,
            password,
           
          });
          if (res && res.data.success) {
            alert("login succesfully")
            // toast.success(res.data && res.data.message);
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      };


  return (
    <Layout title="Register E-commerce-App">
      <div className="form-container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your name"
              required
            />
          </div> */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your password"
              required
            />
          </div>
          {/* <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your phone number"
              required
            />
          </div> */}
          {/* <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your Address"
              required
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login