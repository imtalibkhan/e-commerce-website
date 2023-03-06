import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import "../../style/AdminDashboard.css";



const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {" "}
            Content
            <div className="col-md-9">
              <div className="card p-3 ">
              <div>  <h3 className="admin-color">  Admin Name:</h3> </div>    <div><h3>{auth?.user?.name}</h3></div> 
              <div> <h3 className="admin-color">  Admin Email:</h3> </div>   <div><h3>{auth?.user?.email}</h3> </div> 
              <div> <h3 className="admin-color">  Admin contact:</h3> </div> <div><h3> {auth?.user?.phone}</h3> </div> 
               

              </div>
            </div>
          </div>
        </div>
      </div>
  
    </Layout>
    
  );

  
};



export default AdminDashboard;





