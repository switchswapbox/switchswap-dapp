import { useEffect } from 'react';
// material
import { Container, Grid, Typography, IconButton } from '@mui/material';

import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar, VariantType } from 'notistack';

// hooks
import useSettings from '../hooks/useSettings';
import useLocales from '../hooks/useLocales';
// components
import Page from '../components/Page';
import { Welcome, NftPresentation } from '../components/_dashboard/home';
// ----------------------------------------------------------------------
export default function Home() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const isWarningNotIssueToken = sessionStorage.getItem('notIssueToken') || false;
  useEffect(() => {
    if (!isWarningNotIssueToken) {
      onSnackbarClose('info');
      sessionStorage.setItem('notIssueToken', 'true');
    }
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSnackbarClose = (color: VariantType) => {
    enqueueSnackbar(
      <div>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {color}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Switchswap is in beta version. Many ideas are being deployed. Get back for more
          interesting products!
        </Typography>
      </div>,
      {
        variant: color,
        autoHideDuration: 20000,
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
          <Grid item xs={12} md={6} lg={7}>
            <Welcome displayName="NFT Minter" />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <NftPresentation />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
