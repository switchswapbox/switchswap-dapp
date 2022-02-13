import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Paper,
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

import NftCard from './components/NftCard';
import { SIMPLIFIED_ERC721_ABI } from '../../constants/simplifiedERC721ABI';
import {
  connectContract,
  getTotalSupply,
  getTokenURI,
  getOwner
} from 'services/smartContract/evmCompatible';
import { getDataFromTokenUri } from 'services/http';
import { parseNftUri } from 'utils/tokenUriHandlers';

const NB_NFT_PER_PAGE = 10;

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

const emptyNftList = new Array(10).fill(null).map((_, index) => ({
  key: index,
  failToLoad: false,
  tokenId: '',
  imageUrl: '',
  name: '',
  nftContract: '',
  owner: ''
}));

export default function CollectionViewer() {
  const { chain, contractAddr, pageNb } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(pageNb || '1'));
  const [pageCount, setPageCount] = useState(1);

  const contract = connectContract(
    contractAddr || '',
    SIMPLIFIED_ERC721_ABI,
    'https://polygon-rpc.com/'
  );

  const [NftList, setNftList] = useState<
    {
      key: number;
      failToLoad: boolean;
      tokenId: string;
      tokenURI?: string;
      imageUrl: string;
      name: string;
      owner?: string;
    }[]
  >(emptyNftList);

  const handlePageChange = (event: any, value: number) => {
    if (value) {
      setPage(value);
    }
  };

  useEffect(() => {
    async function getPageCount() {
      const totalSupply = await getTotalSupply(contract);
      setPageCount(Math.ceil(totalSupply / NB_NFT_PER_PAGE));
    }
    getPageCount();
  }, []);

  useEffect(() => {
    async function getNftList() {
      for (let i = 0; i < NB_NFT_PER_PAGE; i++) {
        const tokenId = (page - 1) * NB_NFT_PER_PAGE + i + 1;
        console.log('tokenId', tokenId);
        getTokenURI(contract, tokenId)
          .then(async (tokenUri) => {
            const parsedTokenUri = parseNftUri(tokenUri);
            const data = await getDataFromTokenUri(parsedTokenUri);
            const owner = await getOwner(contract, tokenId);
            const parsedImageUrl = parseNftUri(data.image || '');
            setNftList((prevList) => {
              prevList[i] = {
                key: i,
                failToLoad: false,
                tokenId: tokenId.toString(),
                tokenURI: tokenUri,
                imageUrl: parsedImageUrl,
                name: data.name || '',
                owner
              };
              return [...prevList];
            });
          })
          .catch((e) => {
            setNftList((prevList) => {
              prevList[i] = { ...prevList[i], failToLoad: true };
              return [...prevList];
            });
            console.log(`Error token ${tokenId}: ${e}`);
          });
      }
    }
    navigate(`/collection/${chain}/${contractAddr}/${page}`);
    setNftList((prevList) => {
      return [...emptyNftList];
    });
    getNftList();
  }, [page]);

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

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2">Name</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">Symbol</Typography>
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
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {NftList.map((nft) => {
            return (
              !nft.failToLoad && (
                <Grid key={nft.key} item xs={12} sm={4} md={3}>
                  <NftCard {...nft} />
                </Grid>
              )
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
