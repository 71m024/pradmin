import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeProvider } from './color-mode.context';
import { ServiceContextProvider } from './service.context';
import { NotificationProvider } from './notification.context';
import { PageContextProvider } from './page.context';

export default function ({ children }) {
  return (
    <ServiceContextProvider>
      <PageContextProvider>
        <ColorModeProvider>
          <NotificationProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </NotificationProvider>
        </ColorModeProvider>
      </PageContextProvider>
    </ServiceContextProvider>
  );
}
