import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright({ company }) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        {company}
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
