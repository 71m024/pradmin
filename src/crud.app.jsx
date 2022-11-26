import * as React from 'react';
import {
  BrowserRouter, Navigate, useLocation, useRoutes,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Login from './components/login';
import Logout from './components/logout';
import AuthService from './service/auth.service';
import AppContextProvider from './app-context-provider';
import customRoutes from '/src/config/routes';

export default function CrudApp() {
  if (useLocation().pathname !== '/login' && !AuthService.getCurrentUser()) {
    return <Navigate push to="/login" />;
  }

  const routes = useRoutes([
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
    <BrowserRouter>
      <AppContextProvider>
        <Container component="main">
          <CssBaseline />
          {routes}
        </Container>
      </AppContextProvider>
    </BrowserRouter>
  );
}
