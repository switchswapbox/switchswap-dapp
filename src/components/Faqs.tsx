// material
import { Grid, Container, Typography, Box, Tooltip } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from './Page';
import { styled } from '@mui/material/styles';
import useCountdown from '../hooks/useCountdown';
import { Icon } from '@iconify/react';
import { MIconButton } from './@material-extend';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { TELEGRAM, TWITTER, DISCORD, MEDIUM } from '../assets/COMMON_VARIABLES';
import { FaqsList, FaqsForm } from './_external-pages/faqs';
// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(0)
  }
}));

const SOCIALS = [
  {
    name: 'Discord',
    icon: <Icon icon="bi:discord" width={24} height={24} />,
    href: DISCORD
  },
  {
    name: 'Telegram',
    icon: <Icon icon="uim:telegram-alt" width={24} height={24} />,
    href: TELEGRAM
  },
  {
    name: 'Twitter',
    icon: <Icon icon="akar-icons:twitter-fill" width={24} height={24} />,
    href: TWITTER
  },
  {
    name: 'Medium',
    icon: <Icon icon="ant-design:medium-square-filled" width={24} height={24} />,
    href: MEDIUM
  }
];

export default function Faqs() {
  return (
    <RootStyle title="Learn More">
      <Container sx={{ mt: 0, mb: 0 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
          Frequently asked questions
        </Typography>

        <FaqsList />

        <FaqsForm />
      </Container>

      <Box sx={{ textAlign: 'center', '& > *': { mx: 1, my: 5 } }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <MIconButton onClick={() => window.open(social.href, '_blank')}>
              {social.icon}
            </MIconButton>
          </Tooltip>
        ))}
      </Box>
    </RootStyle>
  );
}
