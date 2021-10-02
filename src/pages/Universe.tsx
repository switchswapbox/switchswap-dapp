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
import ComingSoon from 'components/ComingSoon';
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
  return (
    <Page title="Univere Gallery">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ComingSoon />
      </Container>
    </Page>
  );
}
