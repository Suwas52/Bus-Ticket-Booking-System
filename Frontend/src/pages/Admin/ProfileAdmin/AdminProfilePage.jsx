import React from 'react'
import AdminProfile from '../../../components/AdminComponent/profile/AdminProfile'
import Sidebar from '../../../components/AdminComponent/sidebar/Sidebar'
import Navbar from '../../../components/AdminComponent/navbar/Navbar'

const AdminProfilePage = () => {
  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />

        <div className="listContainer">
            <div className="listTitle">Profile Settings</div>
            <hr />
            <AdminProfile />
          </div>
        </div>
      </div>
  )
}

export default AdminProfilePage