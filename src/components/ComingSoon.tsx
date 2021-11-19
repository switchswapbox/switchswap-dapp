import { Typography, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import useCountdown from '../hooks/useCountdown';
import { Icon } from '@iconify/react';
import { MIconButton } from './@material-extend';
import { TELEGRAM, TWITTER, DISCORD, MEDIUM } from '../constants/COMMON_VARIABLES';

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

export default function ComingSoon() {
  const countdown = useCountdown(new Date('11/01/2021 21:30'));

  return (
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
            <MIconButton onClick={() => window.open(social.href, '_blank')}>
              {social.icon}
            </MIconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}
