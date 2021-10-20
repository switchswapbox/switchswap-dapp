// material
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  Link,
  Grid,
  Tooltip,
  Pagination
} from '@mui/material';
import { GridSize } from '@mui/material/Grid';
// hooks
import useSettings from '../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { useMeasure } from 'react-use';

// components
import { BallBeat, Pacman } from 'react-pure-loaders';
import Page from '../components/Page';
import { ethers } from 'ethers';
import { ABI } from '../utils/abi';
import { contractAddress } from '../utils/contractAddress';
import { Icon } from '@iconify/react';
import axios from 'axios';
import {
  IPFS_GATEWAY_FOR_FETCHING_DATA,
  NUMBER_OF_NFT_IN_MANAGER_PAGE
} from 'assets/COMMON_VARIABLES';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

type NftCardProps = {
  tokenId: string;
  tokenURI: string;
  imageUrl: string;
  name: string;
  nftContract: string;
};

function NftCard({ tokenId, tokenURI, imageUrl, name, nftContract }: NftCardProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        bgcolor: 'white',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 4)})`
        }
      }}
    >
      <Box sx={{ p: 1, position: 'relative' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '200px', display: loading ? 'flex' : 'none' }}
        >
          <BallBeat color={'#637381'} loading={loading} />
        </Stack>

        <Box
          component="img"
          src={imageUrl}
          onLoad={() => setLoading(false)}
          sx={{
            borderRadius: 1.5,
            top: 0,
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: loading ? 'none' : 'block'
          }}
        />
      </Box>

      <Stack spacing={1} sx={{ p: 2, pt: 1, pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link color="inherit" underline="none" sx={{ width: '100%' }}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Stack sx={{ width: '30%' }} direction="row" alignItems="center">
            <Icon icon="teenyicons:contract-outline" width={16} height={16} />
            <Tooltip title="NFT Contract" sx={{ width: '80%', pl: 0.5 }}>
              <Link
                href={`https://polygonscan.com/address/${nftContract}`}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="body2" noWrap>
                    {nftContract}
                  </Typography>
                </Stack>
              </Link>
            </Tooltip>
          </Stack>
          <Tooltip title="NFT ID">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Icon icon="ant-design:number-outlined" width={16} height={16} />
              <Typography variant="body2" noWrap>
                {tokenId}
              </Typography>
            </Stack>
          </Tooltip>
          <Link
            href={`https://polygonscan.com/token/${nftContract}?a=${tokenId}`}
            underline="none"
            target="_blank"
            rel="noopener"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Icon icon="bi:shield-check" width={16} height={16} />
              <Typography variant="body2" noWrap>
                History
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function NftManager() {
  const theme = useTheme();
  const { pageUrl } = useParams();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();

  const [NftList, setNftList] = useState<
    { tokenId: string; tokenURI: string; imageUrl: string; name: string }[]
  >([]);

  const [page, setPage] = useState(parseInt(pageUrl || '0'));
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  const selectedMetamaskAccount = localStorage.getItem('selectedMetamaskAccount') || '';

  const handlePageChange = (event: any, value: number) => {
    if (value) {
      setLoading(true);
      setPage(value);
      navigate(`/gallery/universe/${value}`);
    }
  };

  const ipfsUriToCid = (ipfsUrl: string) => {
    const CidSearch = ipfsUrl.match(/(Qm[\w]+)/);
    if (CidSearch) {
      return CidSearch[1];
    } else return null;
  };

  const updateListByTokenIndex = async (index: number, contract: ethers.Contract) => {
    const tokenId = (await contract.tokenOfOwnerByIndex(selectedMetamaskAccount, index)).toString();
    const tokenURI = await contract.tokenURI(tokenId);
    const tokenURICid = ipfsUriToCid(tokenURI);
    if (tokenURICid) {
      const tokenURIHttp = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${tokenURICid}`;
      axios.get(tokenURIHttp).then((response) => {
        const name = response.data.name || '';
        if (response.data && response.data.image) {
          const imageCid = ipfsUriToCid(response.data.image);
          if (imageCid) {
            const imageUrl = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${imageCid}`;
            setLoading(false);
            setNftList((NftList) => {
              let addingNftIndex = NftList.length;
              for (let nftIndex = NftList.length; nftIndex > 0; nftIndex--) {
                if (parseInt(tokenId, 10) > parseInt(NftList[nftIndex - 1].tokenId, 10)) {
                  break;
                }
                addingNftIndex--;
              }
              const newNftList = [
                ...NftList.slice(0, addingNftIndex),
                { tokenId, tokenURI, imageUrl, name },
                ...NftList.slice(addingNftIndex)
              ];
              return newNftList;
            });
          }
        }
      });
    }
  };

  const getNftByPage = async (page: number) => {
    if (ethers.utils.isAddress(selectedMetamaskAccount)) {
      setNftList([]);

      const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
      const contract = new ethers.Contract(contractAddress, ABI, provider);

      const NftBalance = (await contract.balanceOf(selectedMetamaskAccount)).toString();

      const stopIndex =
        NUMBER_OF_NFT_IN_MANAGER_PAGE * page > parseInt(NftBalance, 10)
          ? parseInt(NftBalance, 10)
          : NUMBER_OF_NFT_IN_MANAGER_PAGE * page;

      for (let index = NUMBER_OF_NFT_IN_MANAGER_PAGE * (page - 1); index < stopIndex; index++) {
        updateListByTokenIndex(index, contract);
      }
    }
  };

  useEffect(() => {
    getNftByPage(page);
  }, [page]);

  useEffect(() => {
    async function getPageCount() {
      if (ethers.utils.isAddress(selectedMetamaskAccount)) {
        const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const NftBalance = (await contract.balanceOf(selectedMetamaskAccount)).toString();

        setPageCount(Math.ceil(parseInt(NftBalance, 10) / NUMBER_OF_NFT_IN_MANAGER_PAGE));
      }
    }
    getPageCount();
  }, []);

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [lgCol, setLgCol] = useState<GridSize>(4);

  useEffect(() => {
    if (width > theme.breakpoints.values.lg) {
      setLgCol(3);
    } else {
      setLgCol(4);
    }
  }, [width]);

  return (
    <Page title="NFT Manager">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} ref={ref}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <Pacman color={'#637381'} loading={loading} />
          </Stack>
          {NftList.map((nft) => {
            return (
              <Grid key={nft.tokenId} item xs={12} sm={6} md={4} lg={lgCol}>
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
