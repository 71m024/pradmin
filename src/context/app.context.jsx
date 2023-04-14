import { createContext, useEffect, useState } from 'react';
import * as React from 'react';

export const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [state, setState] = useState({ title: 'Pradmin-App' });

  useEffect(() => {
    document.title = state.title;
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}
