import { Typography, Box, Button, Card, Paper } from '@mui/material';

import Iconify from '../../../components/Iconify';

export default function BlockchainConnection() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Connect wallet & select network
      </Typography>
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
        <Typography variant="subtitle2" display="inline">
          Select network on which you want to create your collection. The app is currently pointing
          to{' '}
        </Typography>

        <Button variant="outlined" size="small" sx={{ display: 'inline', borderColor: '#454F5B' }}>
          Ethereum
        </Button>
        <Typography variant="body2" gutterBottom sx={{ mt: 1, wordBreak: 'break-word' }}>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            Address: &nbsp;
          </Typography>
          0x6d26C4B1239643AfA2c89e8A112d2015b3A62F
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            color="info"
            size="small"
            startIcon={<Iconify icon={'fluent:copy-16-regular'} />}
            onClick={() => {}}
            sx={{ mr: 1 }}
          >
            Copy Address
          </Button>
          <Button
            color="success"
            size="small"
            startIcon={<Iconify icon={'bi:journal-check'} />}
            onClick={() => {}}
            sx={{ mr: 1 }}
          >
            Etherscan
          </Button>
          <Button
            size="small"
            startIcon={<Iconify icon={'ant-design:disconnect-outlined'} />}
            onClick={() => {}}
            sx={{ mr: 1 }}
          >
            Disconnect
          </Button>
          <Button size="small" startIcon={<Iconify icon={'si-glyph:arrow-change'} />}>
            Change blockchain
          </Button>
        </Box>
      </Paper>
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
