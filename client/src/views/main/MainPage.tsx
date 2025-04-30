import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido a ZitApp</h1>
      <nav>
        <ul>
          <li><Link to="/clientlogin">Login Cliente</Link></li>
          <li><Link to="/clientregister">Registro Cliente</Link></li>
          <li><Link to="/adminlogin">Login Admin</Link></li>
          <li><Link to="/adminregister">Registro Admin</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MainPage;

  
