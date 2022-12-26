import * as React from 'react';
import { createContext, useState } from 'react';

export const NotificationContext = createContext(null);
export function NotificationProvider({ children }) {
  const [state, setState] = useState(null);
  return (
    <NotificationContext.Provider value={{ state, setState }}>
      {children}
    </NotificationContext.Provider>
  );
}
