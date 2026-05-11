import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">AMS</h2>

      <nav className="nav-links">
        <Link to="dashboard">Dashboard</Link>
        <Link to="attendance">Attendance</Link>
        <Link to="leave">Leave</Link>
        <Link to="team">Team</Link>
        <Link to="reports">Reports</Link>
      </nav>
    </div>
  )
}

export default Sidebar