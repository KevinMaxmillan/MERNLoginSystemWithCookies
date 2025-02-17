
import { useUser } from "../context/UserContext";

export default function Dashboard() {
  const { user } = useUser(); 

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
