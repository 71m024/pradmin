import {
  React, createContext, useMemo, useState,
} from 'react';
import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, useMediaQuery } from '@mui/material';
import Login from './components/login';
import Logout from './components/logout';
import AuthService from './service/auth.service';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function CrudApp({ routes }) {
  if (!(useLocation().pathname === '/login' || AuthService.getCurrentUser())) {
    return <Navigate push to="/login" />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<Navigate to="/users" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {routes}
      </Routes>
    </Container>
  );
}

export default function ToggleColorMode() {
  const states = ['system', 'light', 'dark'];
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const storedColorMode = localStorage.getItem('preferredColorMode');
  const [mode, setMode] = useState(storedColorMode ?? 'system');

  const colorMode = useMemo(
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

  const theme = useMemo(
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
        <CrudApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
