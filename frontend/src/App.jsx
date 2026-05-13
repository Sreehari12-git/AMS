import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import MainLayout from './layouts/MainLayout'
import Leave from './pages/ApplyLeave'
import Teams from './pages/Teams'
import Report from './pages/Report'
import ProtectedRoute from './components/ProtectedRoute'
import ApplyLeave from './pages/ApplyLeave'
import AdminLayout from './layouts/AdminLayout'
import CreateUser from './pages/CreateUser'
import DeleteUser from './pages/DeleteUser'
import EmployeeAttendance from './pages/EmployeeAttendance'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route element = {<ProtectedRoute allowedRoles={"employee"}> <MainLayout/> </ProtectedRoute>}>
          <Route path='/attendance' element={<EmployeeAttendance/>}/>
          <Route path='/leave' element={<ApplyLeave/>}/>
          <Route path='/team' element={<Teams/>}/>
          <Route path='/reports' element={<Report/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={"admin"}><AdminLayout /></ProtectedRoute>}>
          <Route path='/admin/create-user' element={<CreateUser />} />
          <Route path='/admin/delete-user' element={<DeleteUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
