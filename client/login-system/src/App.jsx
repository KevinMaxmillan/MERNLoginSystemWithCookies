import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';


function App() {

  
  return (
    <>

    <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AppRoutes />
      

     
    </>
  );
}

export default App;