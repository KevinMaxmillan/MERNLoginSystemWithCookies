import React, { useState } from 'react';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../api/ApiInstance'
import "../styles/Register.css";



export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name:'',
    email:'',
    password:''
    }
  );
  

  const registerUser = async (e) => {
    e.preventDefault()
    const {name, email,password} =data
    try {
      const {data} = await API.post('/register', {
        name, email,password
      })

      if(data.error){
        toast.error(data.error)
      }else{
        setData({name: '', email: '', password: ''})
        toast.success('User Registered Successfully');
        navigate('/login');

      }
      
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
    
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}


