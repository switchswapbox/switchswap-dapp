import { Box, Button, Container, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import ConfigureSmartContract from './components/ConfigureSmartContract';
import ConnectBlockchain from './components/ConnectBlockchain';
import DeploySmartContract from './components/DeploySmartContract';

export default function CreateCollection() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const [currentTab, setCurrentTab] = useState(0);

  const handleNextButtonClick = () => {
    setCurrentTab(currentTab + 1);
  };

  const handleBackButtonClick = () => {
    setCurrentTab(currentTab - 1);
  };

  const SM_CREATION_TABS = [
    {
      key: 0,
      value: 'blockchain',
      icon: <Iconify icon={'akar-icons:link-chain'} width={20} height={20} />,
      component: <ConnectBlockchain handleNextButtonClick={handleNextButtonClick} />
    },
    {
      key: 1,
      value: 'smart_contract',
      icon: <Iconify icon={'healthicons:i-certificate-paper-outline'} width={20} height={20} />,
      component: (
        <ConfigureSmartContract
          handleNextButtonClick={handleNextButtonClick}
          handleBackButtonClick={handleBackButtonClick}
        />
      )
    },
    {
      key: 2,
      value: 'create_collection',
      icon: <Iconify icon={'eos-icons:subscriptions-created-outlined'} width={20} height={20} />,
      component: <DeploySmartContract handleBackButtonClick={handleBackButtonClick} />
    }
  ];

  return (
    <Page title="Create NFTs Collection">
      <Container maxWidth={'lg'}>
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
            <Box marginBottom={2}>
              <Typography
                variant="h3"
                color="text.primary"
                align={'center'}
                sx={{
                  fontWeight: 700
                }}
              >
                Create your own collection like a pro
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="text.secondary"
                sx={{ fontWeight: 400 }}
                align={'center'}
              >
                With CrustNFTs, you write the smart contract for your NFTs collection and deploy it
                on blockchain in minutes.
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
                size="large"
                fullWidth={isMd ? false : true}
                href={'/'}
                target={'_blank'}
                color="info"
                sx={{ backgroundColor: '#377dff' }}
              >
                Case studies
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
        </Box>

        <Box sx={{ mb: 5 }} />

        {/* <Tabs
          value={SM_CREATION_TABS[currentTab].key}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {SM_CREATION_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.key}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.key}
            />
          ))}
        </Tabs> */}

        <Box sx={{ mb: 3 }} />
        <ConnectBlockchain />
      </Container>
    </Page>
  );
}
