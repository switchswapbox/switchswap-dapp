// material
import { Container, Grid, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import ComponentCard from './components/ComponentCard';
// ----------------------------------------------------------------------

export default function FunBox() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Fun Box">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container sx={{ pb: 5 }}>
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="h5" paragraph>
              NFT Box
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Helpful tools for minting/ tracking NFT
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            {[
              {
                name: '$CRU Faucet',
                href: '/fun-box/cru-faucet',
                icon: './static/components/checkbox.png'
              },
              {
                name: '$MATIC Faucet',
                href: '/fun-box/matic-faucet',
                icon: './static/components/color.png'
              }
              // { name: "File's health monitor", href: '#', icon: './static/components/rating.png' }
            ].map((item) => (
              <ComponentCard key={item.name} item={item} />
            ))}
          </Grid>
        </Grid>
        {/* <Grid>
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="h5" paragraph>
              Switchswap Box
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Switchswap proposal/ discussion
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            {[
              {
                name: 'Proposal',
                href: '#',
                icon: './static/components/form-validation.png'
              },
              {
                name: 'Reach us',
                href: '#',
                icon: './static/components/badge.png'
              }
            ].map((item) => (
              <ComponentCard key={item.name} item={item} />
            ))}
          </Grid>
        </Grid> */}
      </Container>
    </Page>
  );
}
