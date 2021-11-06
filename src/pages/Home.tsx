import { useEffect } from 'react';
// material
import { Container, Grid, Typography, IconButton, SvgIcon } from '@mui/material';

import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar, VariantType } from 'notistack';

// hooks
import useSettings from '../hooks/useSettings';
import useLocales from '../hooks/useLocales';
// components
import Page from '../components/Page';
import {
  Welcome,
  NftPresentation,
  StatisticsCard,
  ProjectTimeline
} from '../components/_dashboard/home';
import useSnackbarAction from 'hooks/useSnackbarAction';
// ----------------------------------------------------------------------
export default function Home() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const isWarningNotIssueToken = sessionStorage.getItem('notIssueToken') || false;
  const onSnackbarAction = useSnackbarAction();
  useEffect(() => {
    if (!isWarningNotIssueToken) {
      onSnackbarAction(
        'info',
        'Switchswap is in beta version. Many ideas are being deployed. Get back for more interesting products!',
        15000
      );
      sessionStorage.setItem('notIssueToken', 'true');
    }
  }, []);

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
          <Grid item xs={12} md={4}>
            <StatisticsCard text="Total Minted NFT" value={143}>
              <SvgIcon>
                <Icon icon="bi:card-image" width="20" height="20" />
              </SvgIcon>
            </StatisticsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatisticsCard text="Locked NFTs value" value={0}>
              <SvgIcon>
                <Icon icon="fa-solid:user-lock" width="20" height="20" />
              </SvgIcon>
            </StatisticsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatisticsCard text="NFTs trading volumn" value={0}>
              <SvgIcon>
                <Icon icon="dashicons:money-alt" width="24" height="24" />
              </SvgIcon>
            </StatisticsCard>
          </Grid>
          <Grid item xs={12}>
            <ProjectTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
