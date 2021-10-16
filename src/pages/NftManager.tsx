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
  Grid,
  Pagination
} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
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
};

function NftCard({ tokenId, tokenURI, imageUrl }: NftCardProps) {
  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon={roundVpnKey} width={16} height={16} />
            <Typography variant="caption">Room xxx</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon={peopleFill} width={16} height={16} />
            <Typography variant="caption">Hello Person</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Box component="img" src={imageUrl} sx={{ borderRadius: 1.5, width: 1 }} />
      </Box>
    </Paper>
  );
}

export default function NftManager() {
  const { themeStretch } = useSettings();

  const [NftList, setNftList] = useState<{ tokenId: string; tokenURI: string; imageUrl: string }[]>(
    []
  );

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
                { tokenId, tokenURI, imageUrl },
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
