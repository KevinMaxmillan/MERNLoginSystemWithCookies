import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AppRoutes />
    </>
  );
}

export default App;