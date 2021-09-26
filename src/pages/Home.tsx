// material
import { useEffect } from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';

import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar, VariantType, SnackbarOrigin } from 'notistack';

// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { HomeWelcome, HomeNftPresentation } from '../components/_dashboard/home';
// ----------------------------------------------------------------------
export default function Home() {
  const { themeStretch } = useSettings();

  useEffect(() => {
    onSnackbarClose('info');
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSnackbarClose = (color: VariantType) => {
    enqueueSnackbar(
      <div>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {color}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Switchswap didn't issue any token
        </Typography>
      </div>,
      {
        variant: color,
        action: (key) => (
          <IconButton size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} width={24} height={24} />
          </IconButton>
        )
      }
    );
  };

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <HomeWelcome displayName="NFT Minter" />
          </Grid>
          <Grid item xs={12} md={4}>
            <HomeNftPresentation />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
