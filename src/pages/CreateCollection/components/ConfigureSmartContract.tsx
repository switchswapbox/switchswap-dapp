import { Typography, Box, Button, Card, Paper, Grid } from '@mui/material';

import Iconify from '../../../components/Iconify';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { useTheme } from '@mui/material/styles';

export default function ConfigureSmartContract() {
  const theme = useTheme();
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Configuration of Smart Contract
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
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
            Hello
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            component={SyntaxHighlighter}
            language={'javascript'}
            style={vs2015}
            padding={`${theme.spacing(2)} !important`}
            borderRadius={2}
            margin={`${theme.spacing(0)} !important`}
            bgcolor={'#21325b !important'}
          >
            {`
> $ yarn install
// Or
> $ npm install

// Everything installed!


> $ yarn start
// Or
> $ npm run start

// LiveReload started. Opening localhost:3000
        `}
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Button size="small" startIcon={<Iconify icon={'fluent:next-20-regular'} />}>
          Next
        </Button>
      </Box>
    </Card>
  );
}
