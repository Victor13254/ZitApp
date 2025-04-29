import Router from './routes/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
