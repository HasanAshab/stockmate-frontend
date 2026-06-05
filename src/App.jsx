import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;
