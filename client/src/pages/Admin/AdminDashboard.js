import React from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const AdminDashboard = () => {
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />

        </div>
        <div className='col-md-9'> Content </div>

        </div>

      </div>
    </Layout>
  )
}

export default AdminDashboard