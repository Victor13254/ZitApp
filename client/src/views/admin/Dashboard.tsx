// src/views/client/Dashboard.tsx
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de importar correctamente el hook useAuth
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();  // Obtén el estado del usuario y la función logout
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login'); // Si no hay un usuario logeado, redirige al login
    }
  }, [user, navigate]);  // Asegúrate de que `user` y `navigate` sean dependencias, para evitar bucles infinitos

  const handleLogout = () => {
    logout(); // Llama a la función logout
    navigate('/'); // Redirige al usuario al MainPage después de cerrar sesión
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bienvenido al Dashboard del Admin</h1>
      {/* Verifica si el usuario está logeado */}
      {user ? (
        <>
          <p>Hola, {user.username}</p>
          <button 
            onClick={handleLogout} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>Cargando...</p> // Mensaje mientras esperamos que el estado se actualice
      )}
    </div>
  );
};

export default AdminDashboard;
