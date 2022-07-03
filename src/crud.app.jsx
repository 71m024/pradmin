import * as React from 'react';
import {
  Navigate, Route, Routes, useLocation, useRoutes
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, useMediaQuery } from '@mui/material';
import Login from './components/login';
import Logout from './components/logout';
import AuthService from './service/auth.service';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function CrudContainer({ routes }) {
  if (useLocation().pathname !== '/login' && !AuthService.getCurrentUser()) {
    return <Navigate push to="/login" />;
  }

  const allRoutes = useRoutes([
    {
      index: true,
      element: <Navigate to="/user" />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'logout',
      element: <Logout />
    },
    ...routes
  ]);

  return (
    <Container component="main">
      <CssBaseline />
      {allRoutes}
    </Container>
  );
}

export function CrudApp({ routes }) {
  const states = ['system', 'light', 'dark'];
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const storedColorMode = localStorage.getItem('preferredColorMode');
  const [mode, setMode] = React.useState(storedColorMode ?? 'system');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((m) => {
          const selectedMode = states[(states.indexOf(m) + 1) % 3];
          localStorage.setItem('preferredColorMode', selectedMode);
          return selectedMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode,
      },
    }),
    [mode, systemPrefersDark],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CrudContainer routes={routes} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
