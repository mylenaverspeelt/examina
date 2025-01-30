import React, { ReactNode } from 'react';
import { Container as MuiContainer } from '@mui/material';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <MuiContainer className="custom-container">
      <div className="container-main">
        {children}
      </div>
    </MuiContainer>
  );
}