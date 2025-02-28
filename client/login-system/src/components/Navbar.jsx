import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useLogout, useProfile } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { data: user } = useProfile(); 
  const logoutMutation = useLogout(); 

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: "white" }}>MyApp</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <> 
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
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
