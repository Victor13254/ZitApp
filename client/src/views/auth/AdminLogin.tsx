import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState(''); // El campo que aceptará email o username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Agregamos un estado para manejar la carga
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar el login del contexto

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validar que se ingrese el campo identifier (ya sea email o username) y la contraseña
    if (!identifier) {
      setError('Debe ingresar un nombre de usuario o correo electrónico.');
      return;
    }

    if (!password) {
      setError('Debe ingresar una contraseña.');
      return;
    }

    setError(''); // Limpiamos el error antes de intentar el login
    setLoading(true); // Indicamos que estamos haciendo la solicitud

    const userData = { identifier, password };

    try {
      // Enviar los datos al servidor para hacer login
      const response = await axios.post('http://localhost:5000/login-admin', userData);

      // Si el login es exitoso, redirigir al dashboard
      if (response.status === 200) {
        // Al hacer login exitoso, guardar el rol y los datos del usuario
        const userData = { username: response.data.user.username, role: response.data.user.role };
        login(userData);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setLoading(false); // Terminamos la carga
      setError('Correo electrónico/Usuario o contraseña incorrectos'); // Error en el login
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identifier">Correo electrónico o nombre de usuario:</label>
          <input
            type="text"
            id="identifier"
            placeholder="Correo electrónico o nombre de usuario"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
