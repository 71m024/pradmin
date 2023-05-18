import * as React from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Login from './ui/login';
import Logout from './ui/logout';
import AuthService from './service/auth.service';

export default function Routing({ routes }) {
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
    ...routes,
  ]);

  return (
    <Container component="main">
      <CssBaseline />
      {allRoutes}
    </Container>
  );
}
