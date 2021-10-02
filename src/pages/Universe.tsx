// material
import { Container, Typography, Box, Tooltip } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import useCountdown from '../hooks/useCountdown';
import { Icon } from '@iconify/react';
import { MIconButton } from '../components/@material-extend';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// ----------------------------------------------------------------------
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

const SOCIALS = [
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={24} height={24} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={24} height={24} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={24} height={24} color="#1C9CEA" />
  }
];

export default function Universe() {
  const { themeStretch } = useSettings();
  const countdown = useCountdown(new Date('11/01/2021 21:30'));
  return (
    <Page title="Univere Gallery">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph sx={{ my: 5 }}>
            Coming Soon!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We are currently working hard on this page!
          </Typography>

          <CountdownStyle>
            <div>
              <Typography variant="h2">{countdown.days}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.hours}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.minutes}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.seconds}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
            </div>
          </CountdownStyle>

          <Box sx={{ textAlign: 'center', '& > *': { mx: 1, my: 5 } }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
