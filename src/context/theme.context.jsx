import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = React.createContext({ toggleColorMode: () => {} });

export function ThemeContextProvider({ children }) {
  const states = ['system', 'light', 'dark'];
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const storedColorMode = localStorage.getItem('preferredColorMode');
  const [colorMode, setColorMode] = React.useState(storedColorMode ?? 'system');
  const [palette, setPalette] = React.useState({});
  const normalizedColorMode = colorMode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : colorMode;

  const toggleColorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setColorMode((m) => {
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
        mode: normalizedColorMode,
      },
    }),
    [colorMode, systemPrefersDark, palette],
  );

  return (
    <ThemeContext.Provider
      value={{ ...toggleColorMode, colorMode: normalizedColorMode, setPalette }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
