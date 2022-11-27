import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function StatusSnackbar() {
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(location.state?.message !== undefined);
  }, [location]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={location.state?.severity} sx={{ width: '100%' }}>
        {location.state?.message.text}
      </Alert>
    </Snackbar>
  );
}
