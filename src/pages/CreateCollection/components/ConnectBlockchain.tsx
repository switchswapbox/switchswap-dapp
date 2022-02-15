import {
  Box,
  Button,
  Card,
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
import useSnackbarAction from 'hooks/useSnackbarAction';
import useWallet from 'hooks/useWallet';
import Iconify from '../../../components/Iconify';
import type { HandleNextBackButton } from '../CreateCollection.types';
import SmartContractDialogs from './SmartContractDialogs';

export default function ConnectBlockchain({ handleNextButtonClick }: HandleNextBackButton) {
  const { translate } = useLocales();
  const onSnackbarAction = useSnackbarAction();

  const { chain: selectedChain, address, selectedWallet } = useWallet();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      onSnackbarAction('success', translate('connectWallet.copiedAddress'), 3000);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Connect wallet & select network
      </Typography>
      {address && selectedWallet ? (
        <Paper
          sx={{
            p: 3,
            mb: 3,
            width: 1,
            position: 'relative',
            border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
          }}
        >
          <Typography variant="subtitle2" display="inline">
            Select network on which you want to create your collection. The app is currently
            pointing to{' '}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            sx={{ display: 'inline', borderColor: '#454F5B' }}
          >
            {selectedChain.name}
          </Button>
          <Typography variant="body2" gutterBottom sx={{ mt: 1, wordBreak: 'break-word' }}>
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Address: &nbsp;
            </Typography>
            {address}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              color="info"
              size="small"
              startIcon={<Iconify icon={'fluent:copy-16-regular'} />}
              onClick={handleCopyAddress}
              sx={{ mr: 1 }}
            >
              Copy Address
            </Button>
            <Button
              color="success"
              size="small"
              startIcon={<Iconify icon={'bi:journal-check'} />}
              onClick={() => {
                window.open(`${selectedChain.blockExplorerUrl}/address/${address}`, '_blank');
              }}
              sx={{ mr: 1 }}
            >
              Explorer
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 3,
            mb: 3,
            width: 1,
            position: 'relative',
            border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
          }}
        >
          <Typography variant="subtitle2">
            You need to connect a wallet to create the NFTs collection
          </Typography>
        </Paper>
      )}
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
            />
            <TextField
              id="tokenSymbol"
              label="Token Symbol"
              variant="outlined"
              fullWidth
              margin="normal"
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
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Name
                </Typography>
                <Typography variant="subtitle2">This is a Name</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Symbol
                </Typography>
                <Typography variant="subtitle2">This is a symbol</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Standard
                </Typography>
                <Typography variant="subtitle2">ERC721</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Network
                </Typography>
                <Typography variant="subtitle2">Ethereum</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Address
                </Typography>
                <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                  0x3E6b21EDDa47B7075cDd5AE5b8E6D50cBeD0d519
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
      <Stack direction="column">
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
          disabled={!(address && selectedWallet)}
          startIcon={<Iconify icon={'fluent:next-28-regular'} />}
          sx={{ px: 5 }}
        >
          Deploy
        </Button>
      </Box>
    </Card>
  );
}
