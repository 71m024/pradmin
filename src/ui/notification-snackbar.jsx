import { Alert, AlertTitle, Snackbar } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../context/notification.context';

export default function NotificationSnackbar() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { state } = useContext(NotificationContext);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={state.severity || 'info'} sx={{ width: '100%' }}>
        {state.title && <AlertTitle>{state.title}</AlertTitle>}
        {state.description}
      </Alert>
    </Snackbar>
  );
}
