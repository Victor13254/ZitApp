import { Routes, Route } from 'react-router-dom';
import Home from '../views/main/MainPage';
import AdminLogin from "../views/auth/AdminLogin";
import AdminRegister from "../views/auth/AdminRegister";
import ClientLogin from "../views/auth/ClientLogin";
import ClientRegister from "../views/auth/ClientRegister";
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
