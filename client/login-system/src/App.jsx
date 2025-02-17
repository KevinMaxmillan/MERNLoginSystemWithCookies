import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
    <UserProvider>
    <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AppRoutes />
      
    </UserProvider>
     
    </>
  );
}

export default App;