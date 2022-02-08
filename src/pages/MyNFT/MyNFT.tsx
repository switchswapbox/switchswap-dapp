import { capitalCase } from 'change-case';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import ProfileCover from './components/ProfileCover';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

export default function MyNFT() {
  const [currentTab, setCurrentTab] = useState('NFTs');

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover />
          <TabsWrapperStyle>
            <Tabs
              value="NFTs"
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              <Tab disableRipple key="NFTs" value="NFTs" label={capitalCase('NFTs')} />
            </Tabs>
          </TabsWrapperStyle>
        </Card>
        {currentTab === 'NFTs' && <Box key="NFTs">Hello</Box>}
      </Container>
    </Page>
  );
}
