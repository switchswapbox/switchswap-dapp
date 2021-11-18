import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps } from '@mui/material';
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
  const { translate } = useLocales();

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

        <Button
          key="learn-more"
          to={PATH_DASHBOARD.about.learnMore}
          component={RouterLink}
          variant="contained"
        >
          {translate(`general.learnMore`)}
        </Button>
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
