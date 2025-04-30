// src/routes/ProtectedRoute.tsx
import React, { JSX, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole: 'client' | 'admin' | 'any';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />; // redirige al login si no está autenticado
  }

  if (requiredRole !== 'any' && user.role !== requiredRole) {
    // redirige al dashboard correcto si intenta acceder a algo que no le corresponde
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return element;
};

  const redirectTo = () => {
    if (!user) {
      return '/';
    }
    if (requiredRole === 'client' && user.role !== 'client') {
      return '/client/dashboard';
    }
    if (requiredRole === 'admin' && user.role !== 'admin') {
      return '/admin/dashboard';
    }
    return '';
  };

  const redirectUrl = redirectTo();

  if (isRedirecting) {
    if (redirectUrl) {
      return <Navigate to={redirectUrl} />;
    }
    return <div>Cargando...</div>;
  }

  return element; // Si no hay redirección, renderizamos el componente protegido
};

export default ProtectedRoute;
