// material
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Avatar,
  Box,
  Link,
  Card,
  Grid,
  Tooltip,
  Pagination
} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// components
import Page from '../components/Page';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { ABI } from '../utils/abi';
import { contractAddress } from '../utils/contractAddress';
import { Icon } from '@iconify/react';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import peopleFill from '@iconify/icons-eva/people-fill';
import axios from 'axios';
import {
  IPFS_GATEWAY_FOR_FETCHING_DATA,
  NUMBER_OF_NFT_IN_MANAGER_PAGE
} from 'assets/COMMON_VARIABLES';
// ----------------------------------------------------------------------

type NftCardProps = {
  tokenId: string;
  tokenURI: string;
  imageUrl: string;
  name: string;
};

function NftCard({ tokenId, tokenURI, imageUrl, name }: NftCardProps) {
  return (
    <Paper sx={{ borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Box sx={{ p: 1, position: 'relative' }}>
        <Box
          component="img"
          src={imageUrl}
          sx={{ borderRadius: 1.5, top: 0, width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </Box>

      <Stack spacing={1} sx={{ p: 2, pt: 1, pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link color="inherit" underline="none">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
          <Stack spacing={0}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon="logos:ethereum" width={16} height={16} />
              <Typography variant="subtitle2" noWrap>
                0.01
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Tooltip title="NFT Contract">
            <Link href="#" underline="none" target="_blank" rel="noopener">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Icon icon="teenyicons:contract-outline" width={16} height={16} />
                <Typography variant="body2" noWrap>
                  0xE53821
                </Typography>
              </Stack>
            </Link>
          </Tooltip>
          <Tooltip title="NFT ID">
            <Link href="#" underline="none" target="_blank" rel="noopener">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Icon icon="ant-design:number-outlined" width={16} height={16} />
                <Typography variant="body2" noWrap>
                  142
                </Typography>
              </Stack>
            </Link>
          </Tooltip>
          <Tooltip title="Author Address">
            <Link href="#" underline="none" target="_blank" rel="noopener">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Icon icon="bi:shield-check" width={16} height={16} />
                <Typography variant="body2" noWrap>
                  0x1432
                </Typography>
              </Stack>
            </Link>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function NftManager() {
  const { themeStretch } = useSettings();

  const [NftList, setNftList] = useState<
    { tokenId: string; tokenURI: string; imageUrl: string; name: string }[]
  >([]);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [selectedMetamaskAccount, setselectedMetamaskAccount] = useState(
    localStorage.getItem('selectedMetamaskAccount') || ''
  );

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
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

            setNftList((NftList) => {
              let addingNftIndex = NftList.length;
              for (let nftIndex = NftList.length; nftIndex > 0; nftIndex--) {
                if (tokenId > NftList[nftIndex - 1].tokenId) {
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
  };

  useEffect(() => {
    getNftByPage(page);
  }, [page]);

  useEffect(() => {
    async function getPageCount() {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const NftBalance = (await contract.balanceOf(selectedMetamaskAccount)).toString();

      parseInt(NftBalance, 10);
      setPageCount(Math.ceil(parseInt(NftBalance, 10) / NUMBER_OF_NFT_IN_MANAGER_PAGE));
    }
    getPageCount();
  }, []);

  return (
    <Page title="NFT Manager">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {NftList.map((nft) => {
            return (
              <Grid key={nft.tokenId} item xs={12} sm={6} md={4}>
                <NftCard {...nft} />
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
