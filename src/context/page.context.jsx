import { createContext, useState } from 'react';
import * as React from 'react';

export const PageContext = createContext(null);

export function PageContextProvider({ children }) {
  const [state, setState] = useState({ title: 'Pradmin-App' });
  return (
    <PageContext.Provider value={{ state, setState }}>
      {children}
    </PageContext.Provider>
  );
}
