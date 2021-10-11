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
  IconButton,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Icon } from '@iconify/react';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import ReactHookForm from 'components/_dashboard/funBox/ReactHookForm';
import FaucetForm from 'components/_dashboard/funBox/FaucetForm';
import { Tweet } from 'react-twitter-widgets';
import useCountdown from '../hooks/useCountdown';

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
        <Typography variant="h2">{days}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
      </div>

      <SeparatorStyle variant="h2">:</SeparatorStyle>

      <div>
        <Typography variant="h2">{hours}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
      </div>

      <SeparatorStyle variant="h2">:</SeparatorStyle>

      <div>
        <Typography variant="h2">{minutes}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
      </div>

      <SeparatorStyle variant="h2">:</SeparatorStyle>

      <div>
        <Typography variant="h2">{seconds}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
      </div>
    </CountdownStyle>
  );
}

export default function CruFaucet() {
  const { themeStretch } = useSettings();

  const [tweetId, setTweetId] = useState('');

  const [response, setResponse] = useState<ResponseFaucetRequest>({
    message: '',
    statusCode: -1,
    timeLeftInSeconds: null,
    txHash: null
  });

  const [dedicatedTimeleft, setDedicatedTimeleft] = useState(500);

  useEffect(() => {
    console.log(`timeLeftInSeconds ${response.timeLeftInSeconds}`);
    if (response.timeLeftInSeconds !== null) {
      setDedicatedTimeleft(response.timeLeftInSeconds);
    }
  }, [response.timeLeftInSeconds]);

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="$CRU faucet" />
              <CardContent>
                <ReactHookForm setTweetId={setTweetId} setResponse={setResponse} token="CRU" />
                {/* <FaucetForm /> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader title="Status" />
              <CardContent>
                <Stack sx={{ display: tweetId !== '' ? 'flex' : 'none', mt: '-10px' }}>
                  <Tweet tweetId={tweetId} />
                  <Alert
                    variant="outlined"
                    severity="success"
                    action={
                      <IconButton
                        color="primary"
                        aria-label="crust explorer"
                        href={`https://crust.subscan.io/extrinsic/${response.txHash}`}
                        target="_blank"
                      >
                        <Icon icon="akar-icons:link-out" />
                      </IconButton>
                    }
                  >
                    {response.message}
                  </Alert>
                  <Stack>
                    <Typography variant="h2">Try again in</Typography>
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
