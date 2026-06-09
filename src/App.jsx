import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Toaster position="top-right" />
      <AppRoutes />
      <Analytics />
    </div>
  );
}

export default App;
