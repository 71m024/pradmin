import * as React from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Login from './ui/login';
import Logout from './ui/logout';
import AuthService from './service/auth.service';
import customRoutes from '/src/config/routes';

export default function Routing() {
  if (useLocation().pathname !== '/login' && !AuthService.getCurrentUser()) {
    return <Navigate push to="/login" />;
  }

  const allRoutes = useRoutes([
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
    <Container component="main">
      <CssBaseline />
      {allRoutes}
    </Container>
  );
}
