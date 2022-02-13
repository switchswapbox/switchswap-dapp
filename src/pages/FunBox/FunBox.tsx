import { Container, Grid, Typography } from '@mui/material';
import Page from '../../components/Page';
import ComponentCard from './components/ComponentCard';

export default function FunBox() {
  return (
    <Page title="Faucets">
      <Container maxWidth="lg">
        <Grid container sx={{ pb: 5 }}>
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="h5" paragraph>
              Faucets
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Faucets for trying out our products
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            {[
              {
                name: '$CRU Faucet',
                href: '/faucets/crust',
                icon: './static/components/checkbox.png'
              },
              {
                name: '$MATIC Faucet',
                href: '/faucets/polygon',
                icon: './static/components/color.png'
              }
            ].map((item) => (
              <ComponentCard key={item.name} item={item} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
