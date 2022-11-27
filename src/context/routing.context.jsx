import { React } from 'react';
import {
  BrowserRouter, Navigate, useLocation, useRoutes,
} from 'react-router-dom';
import AuthService from '../service/auth.service';
import customRoutes from '/src/config/routes';
import Login from '../ui/login';
import Logout from '../ui/logout';

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

  return (
    <BrowserRouter>{children}</BrowserRouter>
  );
}
