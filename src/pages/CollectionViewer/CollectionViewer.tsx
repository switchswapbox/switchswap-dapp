import { Icon } from '@iconify/react';
import { Box, Chip, Container, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Identicons from '@nimiq/identicons';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataFromTokenUri } from 'services/http';
import {
  connectContract,
  getName,
  getOwner,
  getSymbol,
  getTokenURI,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getRpcUrl } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import Page from '../../components/Page';
import { NB_NFT_PER_PAGE } from '../../configs/general';
import { SIMPLIFIED_ERC721_ABI } from '../../constants/simplifiedERC721ABI';
import NftCard from './components/NftCard';
import ProfileCover, { ProfileCoverProps } from './components/ProfileCover';
Identicons.svgPath = './static/identicons.min.svg';

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

const emptyNftList = new Array(NB_NFT_PER_PAGE).fill(null).map((_, index) => ({
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
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const contract = useMemo(() => {
    return connectContract(contractAddr || '', SIMPLIFIED_ERC721_ABI, getRpcUrl(chain || ''));
  }, [contractAddr, chain]);

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
    getTotalSupply(contract).then((totalSupply) =>
      setPageCount(Math.ceil(totalSupply / NB_NFT_PER_PAGE))
    );
    getName(contract).then((name) => setName(name));
    getSymbol(contract).then((symbol) => setSymbol(symbol));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            console.log(`Error token ${tokenId}: `, e);
          });
      }
    }
    navigate(`/collection/${chain}/${contractAddr}/${page}`);
    setNftList((prevList) => {
      return [...emptyNftList];
    });
    getNftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const [profileCover, setProfileCover] = useState<ProfileCoverProps>({
    coverUrl: 'https://public.nftstatic.com/static/nft/res/d06f4b2332c740658c1f081b2b74ed4b.png',
    avatarUrl: ''
  });

  useEffect(() => {
    Identicons.toDataUrl(contractAddr).then((img: string) => {
      setProfileCover((prevProfileCover) => ({ ...prevProfileCover, avatarUrl: img }));
    });
  }, [contractAddr]);
  //  profileCover = { coverUrl: '', avatarUrl: '' };
  return (
    <Page title={`Collection - ${name}`}>
      <Container maxWidth="lg">
        <Box
          sx={{
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover {...profileCover} />
        </Box>

        <Box sx={{ height: 64 }} />
        <Stack alignItems="center">
          <Typography variant="h3" sx={{ mb: 3 }}>
            {name}
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 3 }}>
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
                Description
              </Typography>
              <Typography variant="body2">
                The rapid evolution of the blockchain world has forced the One-Eyes to evolve in
                order to raise an army to fight for the meta universe. The result is the 10,000th
                EVO Squad - the goal of which is to take over the space for future 3D One-Eyed
                Avatars. Join our squad . One of the goals of the project is to raise funds to fight
                childhood cancer. Don't be indifferent. Community links in the profile description .
              </Typography>
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
                  <Typography variant="subtitle2">{name}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">{symbol}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>
                <Paper>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {NftList.filter((nft) => !nft.failToLoad).map((nft) => (
            <Grid key={nft.key + '-' + nft.tokenId} item xs={12} sm={4} md={3}>
              <NftCard {...nft} />
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" justifyContent="center" sx={{ pt: 6 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Stack>
      </Container>
    </Page>
  );
}
