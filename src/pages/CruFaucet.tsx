// material
import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import ReactHookForm from 'components/_dashboard/funBox/ReactHookForm';
import FaucetForm from 'components/_dashboard/funBox/FaucetForm';
// ----------------------------------------------------------------------

export default function CruFaucet() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={5}>
          {/* <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="Formik Form" />
              <CardContent></CardContent>
            </Card>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="$CRU faucet" />
              <CardContent>
                <ReactHookForm />
                {/* <FaucetForm /> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
