import { useEffect, useState } from "react";
import authService from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await authService.getProfile();
        setUser(profile); 
      } catch (error) {
        console.error(error);
        navigate("/login"); 
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {user ? (
        <h2>Hello, {user.name} 👋</h2>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
