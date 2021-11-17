import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Alert,
  Button
} from '@mui/material';

import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import FaucetHookForm from 'components/faucet/FaucetHookForm';
import { Tweet } from 'react-twitter-widgets';
import { ResponseFaucetRequest } from '../../interfaces/faucet';

export default function CruFaucet() {
  const { themeStretch } = useSettings();

  const [tweetId, setTweetId] = useState('');

  const [response, setResponse] = useState<ResponseFaucetRequest>({
    message: '',
    statusCode: -1,
    timeLeftInSeconds: null,
    txHash: null
  });

  return (
    <Page title="CRU Faucet">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="$CRU faucet" />
              <CardContent>
                <FaucetHookForm setTweetId={setTweetId} setResponse={setResponse} token="CRU" />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: tweetId !== '' || response.statusCode !== -1 ? 'block' : 'none' }}
          >
            <Card sx={{ position: 'static' }}>
              <CardHeader title="Status" />
              <CardContent>
                <Stack sx={{ mt: '-10px' }}>
                  <Stack sx={{ display: tweetId !== '' ? 'flex' : 'none' }}>
                    <Tweet tweetId={tweetId} />
                  </Stack>
                  <Alert
                    variant="outlined"
                    severity={response.statusCode === 0 ? 'success' : 'warning'}
                    sx={{ display: response.statusCode === -1 ? 'none' : 'flex', mt: 1 }}
                    action={
                      <Button
                        size="small"
                        variant="outlined"
                        href={`https://crust.subscan.io/extrinsic/${response.txHash}`}
                        target="_blank"
                        sx={{ display: response.statusCode === 0 ? 'flex' : 'none' }}
                      >
                        Subscan
                      </Button>
                    }
                  >
                    {response.message}
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
