import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout