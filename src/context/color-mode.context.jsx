import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ColorModeProvider({ children }) {
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
        primary: {
          main: '#f07e00',
        },
        secondary: {
          main: '#ffb74d',
        },
        mode: mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode,
      },
    }),
    [mode, systemPrefersDark],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
