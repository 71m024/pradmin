import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './theme.context';
import { ServiceContextProvider } from './service.context';
import { NotificationProvider } from './notification.context';
import { AppContextProvider } from './app.context';

export default function ContextWrapper({ children }) {
  return (
    <ServiceContextProvider>
      <AppContextProvider>
        <ThemeContextProvider>
          <NotificationProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </NotificationProvider>
        </ThemeContextProvider>
      </AppContextProvider>
    </ServiceContextProvider>
  );
}
