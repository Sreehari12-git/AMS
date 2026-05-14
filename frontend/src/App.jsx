import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import MainLayout from './layouts/MainLayout'
import Leave from './pages/ApplyLeave'
import ProtectedRoute from './components/ProtectedRoute'
import ApplyLeave from './pages/ApplyLeave'
import AdminLayout from './layouts/AdminLayout'
import CreateUser from './pages/CreateUser'
import DeleteUser from './pages/DeleteUser'
import Attendance from './pages/Attendance'
import HRLayout from "./layouts/HRLayout"
import LeaveRequest from './pages/LeaveRequest'
import LeaveStatus from './pages/LeaveStatus'
function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route element = {<ProtectedRoute allowedRoles={"employee"}> <MainLayout/> </ProtectedRoute>}>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/leave' element={<ApplyLeave/>}/>
          <Route path='/leave-status' element={<LeaveStatus/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={"admin"}><AdminLayout /></ProtectedRoute>}>
          <Route path='/admin/create-user' element={<CreateUser />} />
          <Route path='/admin/delete-user' element={<DeleteUser />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={"HR"}><HRLayout /></ProtectedRoute>}>
          <Route path='/leave-request' element={<LeaveRequest/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
