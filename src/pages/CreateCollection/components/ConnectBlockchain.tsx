import { Box, Button, Card, Paper, Typography } from '@mui/material';
import useLocales from 'hooks/useLocales';
import useSnackbarAction from 'hooks/useSnackbarAction';
import useWallet from 'hooks/useWallet';
import Iconify from '../../../components/Iconify';

export default function ConnectBlockchain() {
  const { translate } = useLocales();
  const onSnackbarAction = useSnackbarAction();

  const {
    chain: selectedChain,
    address,
    selectedWallet,
    onSelectWallet,
    onDisconnectWallet
  } = useWallet();

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
          Select network on which you want to create your collection. The app is currently pointing
          to{' '}
        </Typography>

        <Button variant="outlined" size="small" sx={{ display: 'inline', borderColor: '#454F5B' }}>
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

          <Button
            size="small"
            startIcon={
              <Iconify
                icon={'si-glyph:arrow-change'}
                onClick={() => {
                  onSelectWallet('Hello');
                }}
              />
            }
          >
            Change blockchain
          </Button>
        </Box>
      </Paper>
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
          You need to connect a wallet to create a collection
        </Typography>

        <Button variant="outlined" size="small" sx={{ mt: 1 }}>
          Connect
        </Button>
      </Paper>

      <Box>
        <Button size="small" startIcon={<Iconify icon={'fluent:next-28-regular'} />}>
          Next
        </Button>
      </Box>
    </Card>
  );
}
