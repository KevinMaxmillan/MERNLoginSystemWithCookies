import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
      const { data: response } = await axios.post('/login', { email, password });

      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ email: '', password: '' }); 
        toast.success('User Logged In Successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
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

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
