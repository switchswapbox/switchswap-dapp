import { capitalCase } from 'change-case';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Tab, Box, Paper, Card, Tabs, Container, Stack, Grid, Pagination } from '@mui/material';
import Page from '../../components/Page';
import ProfileCover from './components/ProfileCover';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import { contractAddress } from '../../utils/contractAddress';

import NftCard from '../../components/gallery/NftCard';

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

  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover />
        </Box>

        <Box sx={{ height: 100 }} />

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
