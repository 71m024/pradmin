import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import AppContextProvider from './context/app.context';

export default function CrudApp() {
  return (
    <AppContextProvider>
      <Container component="main">
        <CssBaseline />
      </Container>
    </AppContextProvider>
  );
}
