import * as React from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Login from '../ui/login';
import Logout from '../ui/logout';
import AuthService from '../service/auth.service';
import customRoutes from '/src/config/routes';

export default function RoutingProvider({ children }) {
  if (useLocation().pathname !== '/login' && !AuthService.getCurrentUser()) {
    return <Navigate push to="/login" />;
  }

  useRoutes([
    {
      index: true,
      element: <Navigate to="/users" />,
    },
    {
      path: 'login',
      element: <Login company="eventpool" />,
    },
    {
      path: 'logout',
      element: <Logout />,
    },
    ...customRoutes,
  ]);

  return children;
}
