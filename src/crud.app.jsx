import * as React from 'react';
import AppContextProvider from './context/app.context';
import Routing from './routing';

export default function CrudApp() {
  return (
    <AppContextProvider>
      <Routing />
    </AppContextProvider>
  );
}
