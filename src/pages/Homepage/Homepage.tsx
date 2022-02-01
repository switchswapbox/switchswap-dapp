import { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Divider, Avatar } from '@mui/material';
import Page from '../../components/Page';
import Typed from 'react-typed';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { colors } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';

const mock = [
  {
    title: 'Your NFTs collection, your smart contract',
    subtitle:
      'CrustNFTs is built to make your life easier. You write and deploy your smart contract in minutes',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    )
  },
  {
    title: 'Unstoppable NFTs',
    subtitle:
      'We connect users to web3 storages such as Crust Network to make sure your NFTs are always safe',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    )
  },
  {
    title: 'Continuous development',
    subtitle:
      'We are supported by Crust Network to build a community oriented application to bring NFTs to everyone',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    )
  }
];

const mockNumber = [
  {
    title: 300,
    subtitle: 'Collection',
    suffix: '+'
  },
  {
    title: 45000,
    subtitle: 'NFTs generated',
    suffix: '+'
  },
  {
    title: 8,
    subtitle: 'Connected blockchain',
    suffix: '+'
  },
  {
    title: 100,
    subtitle: 'Trading volumn',
    suffix: 'M$'
  }
];

export const mockStat = [
  {
    title: 'attendees',
    number: '70,000+'
  },
  {
    title: 'countries',
    number: '160+'
  },
  {
    title: 'speakers',
    number: '1,200+'
  },
  {
    title: 'journalists',
    number: '2,500+'
  },
  {
    title: "CEO's",
    number: '11,000+'
  },
  {
    title: 'investors',
    number: '1,200+'
  }
];

export default function Homepage() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const setViewPortVisibility = (isVisible: boolean) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (
    <Page title="Homepage">
      <Container maxWidth={'lg'}>
        <Grid container spacing={4}>
          <Grid item container xs={12} md={6} alignItems={'center'}>
            <Box data-aos={isMd ? 'fade-right' : 'fade-up'} sx={{ width: '100%' }}>
              <Box marginBottom={2}>
                <Typography variant="h3" color="text.primary" sx={{ fontWeight: 700 }}>
                  <Typography
                    variant={'inherit'}
                    sx={{
                      color: '#3366FF'
                    }}
                  >
                    One Stop Station
                  </Typography>
                  <Typography
                    color={'primary'}
                    component={'span'}
                    variant={'inherit'}
                    sx={{
                      background: `linear-gradient(180deg, transparent 82%, ${alpha(
                        theme.palette.secondary.main,
                        0.3
                      )} 0%)`
                    }}
                  >
                    <Typed
                      strings={['NFTs generator.', 'NFTs manager.', 'NFTs trading connector.']}
                      typeSpeed={80}
                      loop={true}
                    />
                  </Typography>
                </Typography>
              </Box>
              <Box marginBottom={3}>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Decentralized platform for creating, managing, trading your NFTs
                </Typography>
                <Typography
                  variant="h3"
                  color="text.primary"
                  marginBottom={3}
                  sx={{ fontWeight: 700, color: colors.red[400] }}
                >
                  Always Free
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'flex-start' }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth={isMd ? false : true}
                    sx={{ backgroundColor: '#377dff' }}
                  >
                    Create collection
                  </Button>
                  <Box
                    component={Button}
                    color="primary"
                    size="large"
                    marginTop={{ xs: 2, sm: 0 }}
                    marginLeft={{ sm: 2 }}
                    fullWidth={isMd ? false : true}
                    endIcon={
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        width={24}
                        height={24}
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </Box>
                    }
                  >
                    Learn more
                  </Box>
                </Box>
              </Box>
              <Box paddingX={2} paddingY={1} bgcolor={'#edf1f7'} borderRadius={2}>
                <Typography variant="body2" component="p">
                  CrustNFTs is a serverless website, it does not track any data from your wallets.*
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            container
            alignItems={'center'}
            justifyContent={'center'}
            xs={12}
            md={6}
            sx={{
              '& .lazy-load-image-background.lazy-load-image-loaded': {
                width: '100%',
                height: '100%'
              }
            }}
          >
            <Box
              component={LazyLoadImage}
              height={1}
              width={1}
              src={'https://www.pcgamesn.com/wp-content/uploads/2020/12/genshin-impact-builds.jpg'}
              alt="..."
              effect="blur"
              borderRadius={2}
              maxHeight={500}
              sx={{
                objectFit: 'cover',
                boxShadow: '19px 20px 0px 0 rgb(140 152 164 / 13%)',
                filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none'
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginY: '50px' }} />
        <Box>
          <Box marginBottom={4}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700
              }}
              gutterBottom
              color={'text.secondary'}
              align={'center'}
            >
              READY TO USE ON
            </Typography>
          </Box>
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" justifyContent={'center'} alignItems={'center'}>
              {[
                'https://polygon.technology/brand-kit/polygon-logo.svg',
                'https://ethereum.org/static/8ea7775026f258b32e5027fe2408c49f/57723/ethereum-logo-landscape-black.png',
                'https://seeklogo.com/images/B/binance-smart-chain-logo-802A74A1DB-seeklogo.com.png',
                'https://brandpalettes.com/wp-content/uploads/2021/04/fantom-02-02.png',
                'https://assets.website-files.com/6059b554e81c705f9dd2dd32/6100222344a9783fbdf5a4f2_Group%203004.svg',
                'https://mms.businesswire.com/media/20211015005350/en/916803/5/KuCoin_Community_Chain_Green.jpg'
              ].map((item, i) => (
                <Box maxWidth={90} marginTop={2} marginRight={4} key={i}>
                  <Box
                    component="img"
                    width={1}
                    src={item}
                    alt="..."
                    sx={{
                      filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(0.7)' : 'none'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Box>
        <Divider sx={{ marginY: '50px' }} />
        <Box
          sx={{
            position: 'relative',
            '&::after': {
              position: 'absolute',
              content: '""',
              width: '20%',
              zIndex: 1,
              top: 0,
              left: 0,
              height: '100%',
              backgroundSize: '18px 18px',
              backgroundImage: `radial-gradient(${alpha(
                theme.palette.primary.dark,
                0.4
              )} 20%, transparent 20%)`,
              opacity: 0.2
            }
          }}
        >
          <Box position={'relative'} zIndex={2}>
            <Box>
              <Box marginBottom={4}>
                <Box marginBottom={2}>
                  <Typography
                    variant="h3"
                    color="text.primary"
                    align={'center'}
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    Why CrustNFTs
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    color="text.secondary"
                    sx={{ fontWeight: 400 }}
                    align={'center'}
                  >
                    Break the gap between developers and end-users
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'center'}
                >
                  <Button
                    component={'a'}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth={isMd ? false : true}
                    href={'/'}
                    target={'_blank'}
                    sx={{ backgroundColor: '#377dff' }}
                  >
                    Create collection
                  </Button>
                  <Box
                    marginTop={{ xs: 2, sm: 0 }}
                    marginLeft={{ sm: 2 }}
                    width={{ xs: '100%', md: 'auto' }}
                  >
                    <Button
                      component={'a'}
                      href={'/'}
                      variant="outlined"
                      color="primary"
                      size="large"
                      fullWidth={isMd ? false : true}
                    >
                      View documentation
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {mock.map((item, i) => (
                  <Grid item xs={12} md={4} key={i}>
                    <Box width={1} height={1} data-aos={'fade-up'}>
                      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Box
                          component={Avatar}
                          width={60}
                          height={60}
                          marginBottom={2}
                          bgcolor={alpha(theme.palette.primary.main, 0.1)}
                          color={theme.palette.primary.main}
                        >
                          {item.icon}
                        </Box>
                        <Typography
                          variant={'h6'}
                          gutterBottom
                          sx={{ fontWeight: 500 }}
                          align={'center'}
                        >
                          {item.title}
                        </Typography>
                        <Typography align={'center'} color="text.secondary">
                          {item.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>

        <Box
          bgcolor={'primary.main'}
          borderRadius={2}
          paddingBottom={{ xs: 2, md: 0 }}
          sx={{ minHeight: '200px', backgroundColor: '#377dff', marginTop: '50px' }}
        >
          <Grid container data-aos="fade-up">
            <Box width={1} display={'flex'} justifyContent={'center'}>
              <Box paddingBottom={{ xs: 1, md: 0 }} display={'flex'} overflow={'auto'}>
                {mockNumber.map((item, i) => (
                  <Grid key={i} item xs={12} md={4}>
                    <Typography variant="h4" color={'primary'} gutterBottom>
                      <VisibilitySensor
                        onChange={(isVisible) => setViewPortVisibility(isVisible)}
                        delayedCall
                      >
                        <CountUp
                          duration={2}
                          end={viewPortEntered ? item.title : 0}
                          start={0}
                          suffix={item.suffix}
                        />
                      </VisibilitySensor>
                    </Typography>
                    <Typography color="text.secondary" component="p">
                      {item.subtitle}
                    </Typography>
                  </Grid>
                ))}
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}
