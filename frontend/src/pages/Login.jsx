import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { loginUser } from '../api/auth'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async() => {
    try {
     const data = await loginUser(email,password);

     const role = data.user.role;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email || email);
      localStorage.setItem("username", data.user.fullName ?? "User");

    
      if(role === "admin") {
        navigate("/admin/create-user")  
      } else if(role === "employee"){
        navigate("/attendance")  
      } else {
        navigate("/leave-request");
      }

    } catch(error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }

 return (
  <div className="login-page">
    <div className="login-container">
      <h1 className="login-title">Login</h1>

      <div className="login-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={login}>
          Login
        </button>
      </div>
    </div>
  </div>
)
}

export default Login
