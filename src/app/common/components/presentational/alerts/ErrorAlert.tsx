import { Alert } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  classes?: string;
};

export const ErrorAlert = ({ children, classes }: Props) => (
  <Alert className={classes} severity="error" variant="filled">
    {children}
  </Alert>
);
