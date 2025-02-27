import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: "white" }}>MyApp</Link>
      </div>
      <div className="navbar-links">
        {isAuth ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
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
