import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps, Popover, Box } from '@mui/material';
import { DocIllustration } from '../../../assets';

import useLocales from '../../../hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

interface HomeWelcomeProps extends CardProps {
  displayName?: string;
}

export default function HomeWelcome({ displayName }: HomeWelcomeProps) {
  const [click, setCLick] = useState<HTMLButtonElement | null>(null);
  const { translate } = useLocales();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCLick(event.currentTarget);
  };
  const handleClose = () => {
    setCLick(null);
  };

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h4">
          {translate(`generalApp.welcome`)},
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {translate(`generalApp.slogan`)}
        </Typography>

        <Button variant="contained" onClick={handleClick}>
          Learn More
        </Button>
        <Popover
          open={Boolean(click)}
          anchorEl={click}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              We are working hard on this page. Stay tuned!
            </Typography>
          </Box>
        </Popover>
      </CardContent>

      <DocIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
