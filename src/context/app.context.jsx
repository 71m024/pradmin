import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeProvider } from './color-mode.context';
import { ServiceContextProvider } from './service.context';

export default function ({ children }) {
  return (
    <ServiceContextProvider>
      <ColorModeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ColorModeProvider>
    </ServiceContextProvider>
  );
}
