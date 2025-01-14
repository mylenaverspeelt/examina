'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h6" component="p" sx={{ marginBottom: '2rem' }}>
        A página que você está procurando não existe.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" className="backButton" size="large">
          Voltar para Home
        </Button>
      </Link>
    </Box>
  );
}
