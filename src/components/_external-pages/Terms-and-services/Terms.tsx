import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Content() {
  return (
    <Box>
      <Typography
        variant={'h6'}
        gutterBottom
        sx={{
          fontWeight: 'medium'
        }}
      >
        INTRODUCTION
      </Typography>
      <Typography component={'p'} color={'text.secondary'}>
        Welcome to{' '}
        <a href="https://switchswap.io" target="_blank">
          https://switchswap.io
        </a>
        , a website-hosted user interface (the ”Interface” or ”App”) provided by Switchswap (”we”,
        ”our”, or ”us”). The Interface provides access to a decentralized protocol on the Polygon
        blockchain that allows users to trade certain digital assets.
      </Typography>
    </Box>
  );
}
