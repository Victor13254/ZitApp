import { Routes, Route } from 'react-router-dom';
import Home from '../views/main/MainPage';
import AdminLogin from '../views/AdminLogin';
import AdminRegister from '../views/AdminRegister';
import ClientLogin from '../views/ClientLogin';
import ClientRegister from '../views/ClientRegister';
import Reservations from '../views/Reservations';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminregister" element={
        <ProtectedRoute role="admin">
          <AdminRegister />
        </ProtectedRoute>
      } />
      <Route path="/clientlogin" element={<ClientLogin />} />
      <Route path="/clientregister" element={<ClientRegister />} />
      <Route path="/reservations" element={
      <ProtectedRoute role="admin">
        <Reservations />
      </ProtectedRoute>
    } />
    </Routes>
  );
}
