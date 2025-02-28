import { useProfile } from "../hooks/useAuth";
import { useTodos } from "../hooks/useAuth";

export default function Dashboard() {
  const { data: user, isLoading: userLoading } = useProfile();
  const { data: todos, isLoading: todosLoading } = useTodos(user?.numericId); 

  if (userLoading) return <p>Loading user data...</p>;
  if (todosLoading) return <p>Loading todos...</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {user ? <h2>Hello, {user.name} 👋</h2> : <p>No user data found.</p>}

      <h3>Your Todos:</h3>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
