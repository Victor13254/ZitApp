import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientLogin from "../views/auth/ClientLogin";
import ClientRegister from "../views/auth/ClientRegister";
import MainPage from "../views/main/MainPage";
import AdminLogin from "../views/auth/AdminLogin";
import AdminRegister from "../views/auth/AdminRegister";
import ClientDashboard from "../views/client/Dashboard";
import AdminDashboard from "../views/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext"; // Importar el hook useAuth

export default function Router() {
  const { user } = useAuth(); // Consumir el contexto de autenticación para obtener el usuario

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Protegemos las rutas de dashboards */}
        <Route
          path="/client/dashboard"
          element={<ProtectedRoute element={<ClientDashboard />} requiredRole="client" />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
        />

        {/* Ruta catch-all para manejar URLs no válidas */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user?.role === 'client'
                  ? '/client/dashboard' // Si es cliente, redirigir al dashboard de cliente
                  : user?.role === 'admin'
                  ? '/admin/dashboard' // Si es admin, redirigir al dashboard de admin
                  : '/' // Si no está logueado, redirigir a la página principal
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
