import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeProvider } from './color-mode.context';
import { ServiceContextProvider } from './service.context';
import { NotificationProvider } from './notification.context';

export default function ({ children }) {
  return (
    <ServiceContextProvider>
      <ColorModeProvider>
        <NotificationProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </NotificationProvider>
      </ColorModeProvider>
    </ServiceContextProvider>
  );
}
