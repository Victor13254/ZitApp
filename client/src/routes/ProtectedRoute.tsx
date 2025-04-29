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
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (user) {
      setIsRedirecting(false);
    } else {
      setIsRedirecting(true);
    }
  }, [user]);

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
