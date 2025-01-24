import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../api/ApiInstance'
import "../styles/Login.css";
export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const { data: response } = await API.post('/login', data);

      if (response.error) {
        toast.error(response.error);
      } else {
        localStorage.setItem('accessToken', response.accessToken);
        toast.success('User Logged In Successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
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

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  </div>
  );
}
