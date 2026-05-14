import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {

    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate("/");
    }
  return (
    <div className="sidebar">
      <h2 className="logo">AMS</h2>

      <nav className="nav-links">
        <NavLink to="attendance" className={({isActive}) => isActive ? "active-link": ""}>Attendance</NavLink>
        <NavLink to="leave" className={({isActive}) => isActive ? "active-link": ""}>Apply Leave</NavLink>
        <NavLink to="leave-status" className={({isActive}) => isActive ? "active-link": ""}>Leave Status</NavLink>
      </nav>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  )
}

export default Sidebar
