import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authServices';
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(data);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success("User Registered Successfully");
        navigate('/login');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <label>Name</label>
          <input type="text" placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

          <label>Email</label>
          <input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

          <label>Password</label>
          <input type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
