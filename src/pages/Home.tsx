// material
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { HomeWelcome, HomeNftPresentation } from '../components/_dashboard/home';
// ----------------------------------------------------------------------
export default function Home() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Page One | Minimal-UI">
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
