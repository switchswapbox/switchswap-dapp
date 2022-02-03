import { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Grid,
  Chip,
  Autocomplete,
  TextField
} from '@mui/material';

import Iconify from '../../../components/Iconify';

const ERC721Features = [{ title: 'Burnable' }, { title: 'Enumarable' }, { title: 'Pausable' }];

export default function DeploySmartContract() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Deploy the collection on Ethereum
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            key={'123'}
            sx={{
              p: 3,
              mb: 3,
              width: 1,
              position: 'relative',
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Typography
              variant="overline"
              sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
            >
              Preview Blockchain
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Network
                </Typography>
                <Typography variant="subtitle2">Ethereum</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Wallet Address
                </Typography>
                <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                  0x6d26C4B1239643AfA2c89e8A112d2015b3A62F
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            key={'123'}
            sx={{
              p: 3,
              mb: 3,
              width: 1,
              position: 'relative',
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Typography
              variant="overline"
              sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
            >
              Preview Collection
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Standard
                </Typography>
                <Typography variant="subtitle2">ERC721</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Features
              </Typography>
              <Paper
                key={'123'}
                sx={{
                  mb: 3,
                  p: 0.5,
                  border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`,
                  '& > :not(style)': {
                    m: 0.5
                  }
                }}
              >
                <Chip size="small" label="Burnable"></Chip>
                <Chip size="small" label="Enumarable"></Chip>
                <Chip size="small" label="Burnable"></Chip>
                <Chip size="small" label="Enumarable"></Chip>
                <Chip size="small" label="Burnable"></Chip>
                <Chip size="small" label="Enumarable"></Chip>
                <Chip size="small" label="Burnable"></Chip>
                <Chip size="small" label="Enumarable"></Chip>
                <Chip size="small" label="Burnable"></Chip>
                <Chip size="small" label="Enumarable"></Chip>
              </Paper>
              <Stack direction="row" justifyContent="space-between"></Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Paper
        key={'123'}
        sx={{
          p: 3,
          mb: 3,
          width: 1,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
        }}
      >
        <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
          Status
        </Typography>
        <Typography variant="body2">
          You're about to create a new collection on Ethereum and will have to confirm a transaction
          with your currently connected wallet. The creation will cost approximately 0,06749 ETH.
          The exact amount will be determined by your wallet
        </Typography>
        <Button variant="outlined" size="small" sx={{ mt: 1 }}>
          Deploy
        </Button>
      </Paper>

      <Box>
        <Button size="small" startIcon={<Iconify icon={'fluent:next-28-regular'} rotate={2} />}>
          Back
        </Button>
      </Box>
    </Card>
  );
}
