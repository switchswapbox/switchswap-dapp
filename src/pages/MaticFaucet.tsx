import { useState, useEffect } from 'react';
// material
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Alert,
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import FaucetHookForm from 'components/_dashboard/funBox/FaucetHookForm';
import { Tweet } from 'react-twitter-widgets';

// ----------------------------------------------------------------------

export interface ResponseFaucetRequest {
  message: string;
  statusCode: number;
  timeLeftInSeconds: number | null;
  txHash: string | null;
}

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5)
  }
}));

function CountDown({ timeLeftInSeconds }: { timeLeftInSeconds: number }) {
  const days = Math.floor(timeLeftInSeconds / (3600 * 24));
  const hours = Math.floor((timeLeftInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
  const seconds = Math.floor(timeLeftInSeconds % 60);

  return (
    <CountdownStyle>
      <div>
        <Typography variant="h3">{days}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
      </div>

      <SeparatorStyle variant="h3">:</SeparatorStyle>

      <div>
        <Typography variant="h3">{hours}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
      </div>

      <SeparatorStyle variant="h3">:</SeparatorStyle>

      <div>
        <Typography variant="h3">{minutes}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
      </div>

      <SeparatorStyle variant="h3">:</SeparatorStyle>

      <div>
        <Typography variant="h3">{seconds}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
      </div>
    </CountdownStyle>
  );
}

export default function MaticFaucet() {
  const { themeStretch } = useSettings();

  const [tweetId, setTweetId] = useState('');

  const [response, setResponse] = useState<ResponseFaucetRequest>({
    message: '',
    statusCode: -1,
    timeLeftInSeconds: null,
    txHash: null
  });

  const [dedicatedTimeleft, setDedicatedTimeleft] = useState(0);

  useEffect(() => {
    console.log(`timeLeftInSeconds ${response.timeLeftInSeconds}`);
    if (response.timeLeftInSeconds !== null) {
      setDedicatedTimeleft(response.timeLeftInSeconds);
    }
  }, [response.timeLeftInSeconds]);

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="$MATIC faucet" />
              <CardContent>
                <FaucetHookForm setTweetId={setTweetId} setResponse={setResponse} token="MATIC" />
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
                        href={`https://polygonscan.com/tx/${response.txHash}`}
                        target="_blank"
                        sx={{ display: response.statusCode === 0 ? 'flex' : 'none' }}
                      >
                        PolygonScan
                      </Button>
                    }
                  >
                    {response.message}
                  </Alert>
                  <Stack
                    justifyContent="center"
                    sx={{ display: response.statusCode === 1 ? 'flex' : 'none', mt: 1 }}
                  >
                    <Typography variant="h3" align="center">
                      Try again in
                    </Typography>
                    <CountDown timeLeftInSeconds={dedicatedTimeleft} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
