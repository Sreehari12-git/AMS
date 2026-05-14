import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css'

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout