import { Link, useNavigate } from "react-router-dom";
import API from "../api/ApiInstance";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.post("/logout");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: "white" }}>
          MyApp
        </Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
