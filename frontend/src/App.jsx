import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import Leave from './pages/Leave'
import Teams from './pages/Teams'
import Report from './pages/Report'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route element = {<MainLayout/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/leave' element={<Leave/>}/>
          <Route path='/team' element={<Teams/>}/>
          <Route path='/reports' element={<Report/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
