import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";


export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [data, setData] = useState({ email: "", password: "" });

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(data);
      toast.success("User Logged In Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <label>Email</label>
          <input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

          <label>Password</label>
          <input type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
}
