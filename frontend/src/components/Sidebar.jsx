import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
        <Link to="attendance">Attendance</Link>
        <Link to="leave">Leave</Link>
        <Link to="team">Team</Link>
        <Link to="reports">Reports</Link>
      </nav>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  )
}

export default Sidebar
