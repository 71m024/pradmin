import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './theme.context';
import { ServiceContextProvider } from './service.context';
import { NotificationProvider } from './notification.context';
import { PageContextProvider } from './page.context';

export default function ({ children }) {
  return (
    <ServiceContextProvider>
      <PageContextProvider>
        <ThemeContextProvider>
          <NotificationProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </NotificationProvider>
        </ThemeContextProvider>
      </PageContextProvider>
    </ServiceContextProvider>
  );
}
