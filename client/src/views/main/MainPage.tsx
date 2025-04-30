// src/views/MainPage.tsx
import { Link } from 'react-router-dom';
export default function MainPage() {
    return (
        <div style={{ padding: '2rem' }}>
          <h1>App reservas restaurante</h1>
          <ul style={{ listStyle: 'none', lineHeight: '2rem' }}>
            <li><Link to="/login">Login Cliente</Link></li>
            <li><Link to="/register">Registro Cliente</Link></li>
            <li><Link to="/admin/login">Login Administrador</Link></li>
            <li><Link to="/admin/register">Registro Administrador</Link></li>
            <li><Link to="/client/dashboard">Dashboard Cliente</Link></li>
            <li><Link to="/admin/dashboard">Dashboard Administrador</Link></li>
          </ul>
        </div>
      );
  }
  
