import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function Dashboard() {
  const { user, fetchProfile } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {user ? <h2>Hello, {user.name} 👋</h2> : <p>Loading user data...</p>}
    </div>
  );
}
