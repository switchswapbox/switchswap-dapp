import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import useLocales from 'hooks/useLocales';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useRef, useState } from 'react';
import Iconify from '../../../components/Iconify';
import type { HandleNextBackButton } from '../CreateCollection.types';
import SmartContractDialogs from './SmartContractDialogs';
export default function ConfigureSmartContract({ handleNextButtonClick }: HandleNextBackButton) {
  const { translate } = useLocales();

  const { chain: selectedChain, address, selectedWallet } = useWallet();
  const { active, account, library, provider, onboard, activate } = useWeb3();

  const timer = useRef<number>();

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  return (
    <>
      <Typography
        variant="overline"
        sx={{ mb: 3, display: active ? 'none' : 'block', color: 'text.secondary' }}
      >
        Select network & Connect wallet
      </Typography>

      <Paper
        sx={{
          p: 3,
          mt: 4,
          mb: 3,
          width: 1,
          display: active ? 'none' : 'block',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
        }}
      >
        <Typography variant="subtitle2">
          You need to connect a wallet to create the NFTs collection
        </Typography>
      </Paper>

      <Box sx={{ display: active ? 'block' : 'none' }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                mb: 2,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
                Settings
              </Typography>
              <TextField
                id="nameSmartContract"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                id="tokenSymbol"
                label="Token Symbol"
                value={symbol}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setSymbol(e.target.value.toUpperCase());
                }}
              />
              <Divider sx={{ my: 3 }} />
              <Typography
                variant="overline"
                sx={{ mb: 2, display: 'block', color: 'text.secondary' }}
              >
                Features
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Enumerable" />
                <FormControlLabel control={<Checkbox />} label="Burnable" />
              </FormGroup>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
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

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2">{name || 'Collection Name'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">{symbol || 'CRUSTNFT'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Network
                  </Typography>
                  <Typography variant="subtitle2">{'Chain'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Address
                  </Typography>
                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                    {account}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>
                <Paper
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
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1}>
            <SmartContractDialogs />
            <Button variant="outlined" size="small" fullWidth={false}>
              Our commitments
            </Button>
          </Stack>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="I agree with the smart contract provided by Crustnft"
          />
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            size="large"
            disabled={!active}
            startIcon={<Iconify icon={'fluent:next-28-regular'} />}
            sx={{ px: 5 }}
          >
            Deploy
          </Button>
        </Box>
      </Box>
    </>
  );
}
