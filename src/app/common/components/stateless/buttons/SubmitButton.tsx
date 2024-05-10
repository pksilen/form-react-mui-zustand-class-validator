import { Button } from '@mui/material';
import React from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export const SubmitButton = ({ children, className }: Props) => (
  <Button className={className} size="large" type="submit" variant="contained">
    {children}
  </Button>
);
