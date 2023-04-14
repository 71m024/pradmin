import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = React.createContext({ toggleColorMode: () => {} });

export function ThemeContextProvider({ children }) {
  const states = ['system', 'light', 'dark'];
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const storedColorMode = localStorage.getItem('preferredColorMode');
  const [mode, setMode] = React.useState(storedColorMode ?? 'system');
  const [palette, setPalette] = React.useState({});

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
        ...palette,
        mode: mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode,
      },
    }),
    [mode, systemPrefersDark],
  );

  return (
    <ThemeContext.Provider value={{ ...colorMode, setPalette }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
