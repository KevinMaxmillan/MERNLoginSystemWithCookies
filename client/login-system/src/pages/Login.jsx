import React, { useState } from 'react';
import axios from 'axios'


export default function Login() {
  const [data, setData] = useState({
    email:'',
    password:''
    }
  );
  

  const loginUser = async (e) => {
    e.preventDefault()
    axios.get('/')
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

        <button type="submit">Register</button>
      </form>
    </div>
  )
}


