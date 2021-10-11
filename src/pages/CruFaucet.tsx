import { useState } from 'react';
// material
import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import ReactHookForm from 'components/_dashboard/funBox/ReactHookForm';
import FaucetForm from 'components/_dashboard/funBox/FaucetForm';
import { Tweet } from 'react-twitter-widgets';

// ----------------------------------------------------------------------

export default function CruFaucet() {
  const { themeStretch } = useSettings();

  const [tweetId, setTweetId] = useState('');

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="$CRU faucet" />
              <CardContent>
                <ReactHookForm token="CRU" />
                {/* <FaucetForm /> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="Status" />
              <CardContent>
                <Tweet tweetId="841418541026877441" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
