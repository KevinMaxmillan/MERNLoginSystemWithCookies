import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";  
import "../styles/Navbar.css";
import authService from "../services/authServices";  

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);



  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: "white" }}>MyApp</Link>
      </div>
      <div className="navbar-links">
        
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        
      </div>
    </nav>
  );
}
