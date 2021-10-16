// material
import { useEffect, useState } from 'react';
import { Container, Typography, Button, Paper, Stack, Avatar, Box, Grid } from '@mui/material';
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
// ----------------------------------------------------------------------

type BookingItemProps = {
  tokenId: string;
  tokenURI: string;
  imageURI: string;
};

function BookingItem({ tokenId, tokenURI, imageURI }: BookingItemProps) {
  // const { avatar, name, roomNumber, bookdAt, person, cover, roomType } = item;

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
        <Box component="img" src={imageURI} sx={{ borderRadius: 1.5, width: 1 }} />
      </Box>
    </Paper>
  );
}

export default function PageFive() {
  const { themeStretch } = useSettings();
  const [totalNFT, setTotalNFT] = useState<number>(0);
  const [NftList, setNftList] = useState<{ tokenId: string; tokenURI: string; imageURI: string }[]>(
    []
  );
  // WARNING: Use useSth to prevent re-create for each render

  const [selectedMetamaskAccount, setselectedMetamaskAccount] = useState(
    localStorage.getItem('selectedMetamaskAccount') || ''
  );

  useEffect(() => {
    async function getAllNft() {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const a = (await contract.balanceOf(selectedMetamaskAccount)).toString();
      // for (let index = 0; index < parseInt(a, 10); index++) {
      for (let index = 0; index < 1; index++) {
        const tokenId = (
          await contract.tokenOfOwnerByIndex(selectedMetamaskAccount, index)
        ).toString();
        const tokenURI = await contract.tokenURI(tokenId);
        axios
          .get('https://ipfs.io/ipfs/QmV1BcaBUZLRLXkYuYYBXMpGBoXSwtXtogQhfkpTuEi9jV')
          .then((response) => {
            console.log(response.data);
            const imageURI = 'https://ipfs.io/ipfs/QmYVSo2YxDnVruJ9QYvrdosTygdGwzt2TqURa1y9Fh6NUq';
            NftList.push({ tokenId, tokenURI, imageURI });
            setNftList([...NftList]);
            console.log(NftList);
          });
      }
    }
    getAllNft();
  }, []);

  const getTotal = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    const a = (await contract.balanceOf(selectedMetamaskAccount)).toString();
    for (let index = 0; index < parseInt(a, 10); index++) {
      const tokenId = (
        await contract.tokenOfOwnerByIndex(selectedMetamaskAccount, index)
      ).toString();
      const tokenURI = await contract.tokenURI(tokenId);
      const imageURI = '';
      NftList.push({ tokenId, tokenURI, imageURI });
      setNftList([...NftList]);
      // console.log(tokenId);
      // console.log(tokenURI);
    }
    console.log(NftList);
  };

  return (
    <Page title="Page Five">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Button onClick={getTotal}>Hello</Button>
        <Grid container spacing={3}>
          {NftList.map((nft) => {
            return (
              <Grid key="12" item xs={12} sm={6} md={4}>
                <BookingItem {...nft} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Page>
  );
}
