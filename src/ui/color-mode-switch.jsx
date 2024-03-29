import * as React from 'react';
import { useContext } from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import { ThemeContext } from '../context/theme.context';

export default function ColorModeSwitch() {
  const colorMode = useContext(ThemeContext);

  const storedMode = localStorage.getItem('preferredColorMode');

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {{
        null: <BrightnessAutoIcon />,
        system: <BrightnessAutoIcon />,
        light: <Brightness7Icon />,
        dark: <Brightness4Icon />,
      }[storedMode]}
    </IconButton>
  );
}
