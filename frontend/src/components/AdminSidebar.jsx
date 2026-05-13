import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AdminSidebar.css'

const AdminSidebar = () => {

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">AMS</h2>

      <nav className="admin-nav-links">
        <Link to="/admin/create-user">Create User</Link>
        <Link to="/admin/delete-user">Delete User</Link>
      </nav>

      <button className="admin-logout-btn" onClick={logout}>Logout</button>
    </div>
  )
}

export default AdminSidebar