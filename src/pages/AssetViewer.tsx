import { useState } from 'react';
import { capitalCase } from 'change-case';

// material
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

// hooks
import useSettings from '../hooks/useSettings';
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';
import { Block } from 'components/Block';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { ProfileCover } from 'components/_dashboard/assetViewer';
import { Icon } from '@iconify/react';

import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// ----------------------------------------------------------------------
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

export default function LearnMore() {
  const { themeStretch } = useSettings();
  const { network, contract, tokenId } = useParams();
  const [currentTab, setCurrentTab] = useState('profile');
  const myProfile = {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
    cover: '/static/mock-images/covers/cover_2.jpg',
    position: 'UI Designer',
    follower: 14098,
    following: 24578,
    quote:
      'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
    country: 'Madagascar',
    email: 'ashlynn_ohara62@gmail.com',
    company: 'Gleichner, Mueller and Tromp',
    school: 'Nikolaus - Leuschke',
    role: 'Manager',
    facebookLink: 'https://www.facebook.com/caitlyn.kerluke',
    instagramLink: 'https://www.instagram.com/caitlyn.kerluke',
    linkedinLink: 'https://www.linkedin.com/in/caitlyn.kerluke',
    twitterLink: 'https://www.twitter.com/caitlyn.kerluke'
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      value: 'followers',
      icon: <Icon icon={heartFill} width={20} height={20} />
    },
    {
      value: 'friends',
      icon: <Icon icon={peopleFill} width={20} height={20} />
    },
    {
      value: 'gallery',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />
    }
  ];

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {network}
        {contract} {tokenId}
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover myProfile={myProfile} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>
      </Container>
    </Page>
  );
}
