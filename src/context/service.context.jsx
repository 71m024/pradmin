import { createContext, React, useMemo } from 'react';
import { AuthService, DataService } from '../index';

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
