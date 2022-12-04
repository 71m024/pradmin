import * as React from 'react';
import { createContext, useMemo } from 'react';
import DataService from '../service/data.service';
import AuthService from '../service/auth.service';

export const ServiceContext = createContext(null);
export function ServiceContextProvider({ children }) {
  const dataService = new DataService();
  const authService = new AuthService();
  const services = useMemo(() => ({ dataService, authService }), []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}
