import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
        <NavLink to="/admin/create-user" className={({isActive}) => isActive ? "active-link" : ""}>Create User</NavLink>
        <NavLink to="/admin/delete-user" className={({isActive}) => isActive ? "active-link" : ""}>Delete User</NavLink>
      </nav>

      <button className="admin-logout-btn" onClick={logout}>Logout</button>
    </div>
  )
}

export default AdminSidebar