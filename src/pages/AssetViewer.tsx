import { useEffect, useState } from 'react';
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
import { Asset } from 'components/_dashboard/assetViewer';

import { Icon } from '@iconify/react';

import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import Identicons from '@nimiq/identicons';
Identicons.svgPath = './static/identicons.min.svg';
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

export default function AssetViewer() {
  const { themeStretch } = useSettings();
  const { network, contract, tokenId } = useParams();
  const [currentTab, setCurrentTab] = useState('asset');
  const assetOwnerProfile = {
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

  const asset = [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      author: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
        avatarUrl: '/static/mock-images/avatars/avatar_2.jpg',
        name: 'Caitlyn Kerluke'
      },
      isLiked: true,
      createdAt: '2021-10-21T11:21:55.548Z',
      media: '/static/mock-images/feeds/feed_1.jpg',
      message: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
      personLikes: [
        {
          name: 'Laney Vazquez',
          avatarUrl: '/static/mock-images/avatars/avatar_28.jpg'
        },
        {
          name: 'Tiffany May',
          avatarUrl: '/static/mock-images/avatars/avatar_29.jpg'
        },
        {
          name: 'Dexter Shepherd',
          avatarUrl: '/static/mock-images/avatars/avatar_30.jpg'
        }
      ],
      comments: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
          author: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
            avatarUrl: '/static/mock-images/avatars/avatar_5.jpg',
            name: 'Lainey Davidson'
          },
          createdAt: '2021-10-19T09:21:55.548Z',
          message: 'Praesent venenatis metus at'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
          author: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
            avatarUrl: '/static/mock-images/avatars/avatar_9.jpg',
            name: 'Cristopher Cardenas'
          },
          createdAt: '2021-10-18T08:21:55.548Z',
          message:
            'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.'
        }
      ]
    }
  ];

  const [ownerIcon, setOwnerIcon] = useState<string>('');
  useEffect(() => {
    Identicons.toDataUrl('0x123456').then((img: string) => {
      setOwnerIcon(img);
    });
  }, []);

  const PROFILE_TABS = [
    {
      value: 'asset',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Asset assetOwnerProfile={assetOwnerProfile} asset={asset} ownerIcon={ownerIcon} />
    },
    // {
    //   value: 'followers',
    //   icon: <Icon icon={heartFill} width={20} height={20} />
    // },
    // {
    //   value: 'friends',
    //   icon: <Icon icon={peopleFill} width={20} height={20} />
    // },
    {
      value: 'gallery',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <Box />
    }
  ];

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
