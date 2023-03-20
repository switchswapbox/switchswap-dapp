import {
  Avatar, Box,
  Button, Card,
  CardContent, colors, Container, Divider, Grid, Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import CountUp from 'react-countup';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Typed from 'react-typed';
import VisibilitySensor from 'react-visibility-sensor';
import Page from '../../components/Page';

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
      'We are supported by Crust Network for building a community oriented application to bring NFTs to everyone',
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
  },
  {
    title: 'Audited smart contracts',
    subtitle: 'We provide audited smart contract templates for your NFTs collections',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <g fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
          />
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
        </g>
      </svg>
    )
  },
  {
    title: 'Zero commission',
    subtitle:
      'We do not inject the commission taker in your smart contract, use as your own smart contract.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
      >
        <path
          d="M9.197 0L7.578 3.735H5.171v3.359h.921l.943 5.975H5.562L7.51 24.042l1.249-.015L10.015 32h11.891l.083-.531l1.172-7.443l1.188.015l1.943-10.973h-1.407l.937-5.975h1.011V3.734h-2.557L22.651-.001zm.704 1.073h12.057l1.025 2.375H8.868zm-3.666 3.73H25.76v1.228H6.235zm.604 9.333h18.183l-1.568 8.823l-7.536-.079l-7.511.079z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    title: 'No third-party ',
    subtitle: 'All operations are local, you interact directly with blockchains',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M709.6 210l.4-.2h.2L512 96L313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8l138.9 79.7l139.1-79.9l135.2 78l-273.9 158l-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"
          fill="currentColor"
        />
      </svg>
    )
  }
];

const mockNumber = [
  {
    title: 300,
    subtitle: 'Collections',
    suffix: '+',
    prefix: ''
  },
  {
    title: 45000,
    subtitle: 'NFTs ',
    suffix: '+',
    prefix: ''
  },
  {
    title: 8,
    subtitle: 'Connected blockchains',
    suffix: '',
    prefix: ''
  },
  {
    title: 100,
    subtitle: 'Trading volume',
    suffix: 'M+',
    prefix: '$'
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
                      color: '#377dff'
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
                  sx={{ fontWeight: 700, color: '#00AB55' }}
                >
                  Community-owned
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'flex-start' }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="info"
                    fullWidth={isMd ? false : true}
                    sx={{ backgroundColor: '#377dff' }}
                    href={'#/create-collection'}
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
                'https://ethereum.org/static/8ea7775026f258b32e5027fe2408c49f/57723/ethereum-logo-landscape-black.png',
                'https://seeklogo.com/images/B/binance-smart-chain-logo-802A74A1DB-seeklogo.com.png',
                'https://brandpalettes.com/wp-content/uploads/2021/04/fantom-02-02.png',
                'https://assets.website-files.com/6059b554e81c705f9dd2dd32/6100222344a9783fbdf5a4f2_Group%203004.svg',
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
          <Box position={'relative'} zIndex={0}>
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
                    color="info"
                    size="large"
                    fullWidth={isMd ? false : true}
                    href={'#/create-collection'}
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
                  <Grid item xs={12} sm={6} md={4} key={i}>
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
          width={1}
          display={'flex'}
          justifyContent={'center'}
          borderRadius={2}
          paddingY={6}
          sx={{ backgroundColor: '#377dff', marginTop: '50px' }}
        >
          <Box paddingBottom={{ xs: 1, md: 0 }} display={'flex'} overflow={'auto'}>
            {mockNumber.map((item, i) => (
              <Box
                key={i}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                flex={'0 0 auto'}
                marginX={2}
              >
                <Typography variant={'h4'} sx={{ fontWeight: 700, color: 'white' }} gutterBottom>
                  <VisibilitySensor
                    onChange={(isVisible) => setViewPortVisibility(isVisible)}
                    delayedCall
                  >
                    <CountUp
                      duration={2}
                      end={viewPortEntered ? item.title : 0}
                      start={0}
                      suffix={item.suffix}
                      prefix={item.prefix}
                    />
                  </VisibilitySensor>
                </Typography>
                <Typography sx={{ color: 'white' }}>{item.subtitle}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Divider sx={{ marginY: '50px' }} />
        <Box>
          <Box marginBottom={4}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700
              }}
              gutterBottom
              align={'center'}
              variant="h3"
              color="text.primary"
            >
              OUR SUPPORTERS
            </Typography>
          </Box>
        </Box>
        <Box
          padding={{ xs: 2, sm: 4 }}
          marginTop={5}
          borderRadius={2}
          bgcolor={theme.palette.mode === 'light' ? colors.amber[50] : '#DEB22F'}
          data-aos={'fade-up'}
        >
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={isMd ? 4 : 2}>
                <Grid
                  item
                  xs={12}
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
                    src={
                      'https://techstory.in/wp-content/uploads/2021/09/612e0cc35e17602a5a6222be_Meta-Image-1200x630-1.png'
                    }
                    alt="..."
                    effect="blur"
                    borderRadius={2}
                    maxWidth={1}
                    maxHeight={400}
                    sx={{
                      objectFit: 'cover'
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={{ xs: 'flex-start', md: 'space-between' }}
                height={1}
              >
                <Box>
                  <Typography variant={'h4'} fontWeight={700} gutterBottom>
                    Crust Network
                  </Typography>
                  <Typography
                    color={theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary'}
                  >
                    CRUST implements the incentive layer protocol for decentralized storage, it
                    makes data unstoppable
                  </Typography>
                </Box>
                <Box component={Card} marginTop={{ xs: 2 }} boxShadow={0}>
                  <CardContent sx={{ padding: { xs: 2, sm: 4 } }}>
                    <Box
                      component="img"
                      height={1}
                      width={1}
                      src={'https://crust.network/_nuxt/img/logo-B@3x.fdbab2d.png'}
                      alt="..."
                      maxWidth={80}
                      marginBottom={2}
                      sx={{
                        filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(0.7)' : 'none'
                      }}
                    />
                    <Typography component={'p'}>
                      “In Web3, everyone should be a creator.”
                    </Typography>
                    <Box marginTop={{ xs: 2, sm: 4 }}>
                      <Typography variant={'subtitle1'} sx={{ fontWeight: 700 }}>
                        Leo Wang
                      </Typography>
                      <Typography color="text.secondary">Co-founder Crust Network</Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4} marginTop={2}>
          {[
            'https://www.pngall.com/wp-content/uploads/10/NEAR-Protocol-Crypto-Logo-PNG-File.png',
            'https://brandpalettes.com/wp-content/uploads/2021/05/elrond-02.png',
            'https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F8d6c8ff9-e171-4223-a4b2-1384ee7530b8_2568x643.png',
          ].map((item, i) => (
            <Grid item key={i} xs={6} sm={4}>
              <Box
                bgcolor={'#f7faff'}
                p={4}
                borderRadius={2}
                display={'flex'}
                justifyContent={'center'}
              >
                <Box component="img" height={1} maxHeight={30} src={item} alt="..." />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
