import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';

import {
  Tab,
  Box,
  Paper,
  Card,
  Tabs,
  Container,
  Stack,
  Grid,
  Pagination,
  Typography,
  Link,
  Chip
} from '@mui/material';
import Page from '../../components/Page';
import ProfileCover from './components/ProfileCover';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import { contractAddress } from '../../utils/contractAddress';

import NftCard from '../../components/gallery/NftCard';
import { SIMPLIFIED_ERC721_ABI } from '../../constants/simplifiedERC721ABI';
import { connectContract, getTotalSupply, getTokenURI } from 'services/smartContract/evmCompatible';

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

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

const mock = [
  {
    tokenId: '1',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/415278e5c62e4bdca1c608f967db8513.gif',
    name: 'Name#1',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '2',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/5ca1d828ada44bfdbbe610b1ef5524c5.png',
    name: 'Name#2',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '3',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/1451e60556704027a42ee72da6d6a11c.png',
    name: 'Name#3',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '4',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/57d22e253a784219a9f3b6eaafdd2f4a.gif',
    name: 'Name#1',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '5',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/a85ad35627c4468f9e8b48de2bf9ba1a.png',
    name: 'Name#1',
    nftContract: '0x1234',
    owner: '0x1423432'
  }
];

export default function CollectionViewer() {
  const [currentTab, setCurrentTab] = useState('nfts');

  const [page, setPage] = useState(parseInt('0'));
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (event: any, value: number) => {
    if (value) {
      setLoading(true);
      setPage(value);
    }
  };

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    async function getPageCount() {
      const contract = connectContract(
        '0xa0Afb3513B99E1b099CE9F3C007eE937B04e7870',
        SIMPLIFIED_ERC721_ABI,
        'https://polygon-rpc.com/'
      );
      // const NftBalance = (await contract.totalSupply()).toString();
      const NftBalance = await getTotalSupply(contract);
      console.log('OUTBALANCE: ', NftBalance);
      const tokenURI = await getTokenURI(contract, 1);
      console.log('tokenURI: ', tokenURI);
    }
    getPageCount();
  }, []);

  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Box
          sx={{
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover />
        </Box>

        <Box sx={{ height: 64 }} />
        <Stack alignItems="center">
          <Typography variant="h3" sx={{ mt: 3, mb: 5 }}>
            Collection Name
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper
              key={'123'}
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Description
              </Typography>
              <Typography variant="body2">
                The rapid evolution of the blockchain world has forced the One-Eyes to evolve in
                order to raise an army to fight for the meta universe. The result is the 10,000th
                EVO Squad - the goal of which is to take over the space for future 3D One-Eyed
                Avatars. Join our squad . One of the goals of the project is to raise funds to fight
                childhood cancer. Don't be indifferent. Community links in the profile description .
              </Typography>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Stack key="1" direction="row" alignItems="center">
                  <IconStyle icon={linkedinFill} color="#006097" />
                  <Link component="span" variant="body2" color="text.primary" noWrap>
                    https://www.linkedin.com/
                  </Link>
                </Stack>
                <Stack key="1" direction="row" alignItems="center">
                  <IconStyle icon={twitterFill} color="#1C9CEA" />
                  <Link component="span" variant="body2" color="text.primary" noWrap>
                    https://www.linkedin.com/
                  </Link>
                </Stack>
                <Stack key="1" direction="row" alignItems="center">
                  <IconStyle icon={instagramFilled} color="#D7336D" />
                  <Link component="span" variant="body2" color="text.primary" noWrap>
                    https://www.linkedin.com/
                  </Link>
                </Stack>
                <Stack key="1" direction="row" alignItems="center">
                  <IconStyle icon={facebookFill} color="#1877F2" />
                  <Link component="span" variant="body2" color="text.primary" noWrap>
                    https://www.linkedin.com/
                  </Link>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Preview Collection
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>
                <Paper
                  key={'123'}
                  sx={{
                    mb: 3,
                    p: 0.5,
                    border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`,
                    '& > :not(style)': {
                      m: 0.5
                    }
                  }}
                >
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <LineScalePulseOutRapid color={'#637381'} loading={loading} />
          </Stack>
          {mock.map((nft) => {
            return (
              <Grid key={nft.tokenId} item xs={12} sm={4} md={3}>
                <NftCard {...nft} nftContract={contractAddress} />
              </Grid>
            );
          })}
        </Grid>
        <Stack direction="row" justifyContent="center" sx={{ pt: 6 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Stack>
      </Container>
    </Page>
  );
}
