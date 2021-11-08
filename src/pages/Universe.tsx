import { useEffect, useState } from 'react';
import { Container, Stack, Grid, Pagination } from '@mui/material';
import useSettings from '../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import Page from '../components/Page';
import { contractAddress } from 'utils/contractAddress';
import { ethers } from 'ethers';
import { ABI } from 'utils/abi';
import {
  IPFS_GATEWAY_FOR_FETCHING_DATA,
  NUMBER_OF_NFT_IN_MANAGER_PAGE
} from 'assets/COMMON_VARIABLES';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useMeasure } from 'react-use';
import { GridSize } from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import NftCard from '../components/_dashboard/gallery/NftCard';
// ----------------------------------------------------------------------

export default function Universe() {
  const theme = useTheme();
  const { pageUrl } = useParams();
  const navigate = useNavigate();

  const { themeStretch } = useSettings();
  const [NftList, setNftList] = useState<
    { tokenId: string; tokenURI: string; imageUrl: string; name: string; owner: string }[]
  >([]);

  const [page, setPage] = useState(parseInt(pageUrl || '0'));
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

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
    const tokenId = (await contract.tokenByIndex(index)).toString();
    const tokenURI = await contract.tokenURI(tokenId);
    const tokenURICid = ipfsUriToCid(tokenURI);
    if (tokenURICid) {
      const tokenURIHttp = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${tokenURICid}`;
      axios.get(tokenURIHttp).then((response) => {
        const name = response.data.name || '';
        const owner = contract.ownerOf(tokenId);
        if (response.data && response.data.image) {
          const imageCid = ipfsUriToCid(response.data.image);
          if (imageCid) {
            const imageUrl = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${imageCid}`;
            setLoading(false);
            setNftList((NftList) => {
              let addingNftIndex = 0;
              for (let nftIndex = 0; nftIndex < NftList.length; nftIndex++) {
                if (parseInt(tokenId, 10) > parseInt(NftList[nftIndex].tokenId, 10)) {
                  break;
                }
                addingNftIndex++;
              }
              const newNftList = [
                ...NftList.slice(0, addingNftIndex),
                { tokenId, tokenURI, imageUrl, name, owner },
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

    const totalSupply = (await contract.totalSupply()).toString();

    const startIndex = totalSupply - 1 - (page - 1) * NUMBER_OF_NFT_IN_MANAGER_PAGE;
    const stopIndex =
      startIndex - NUMBER_OF_NFT_IN_MANAGER_PAGE > -1
        ? startIndex - NUMBER_OF_NFT_IN_MANAGER_PAGE
        : -1;

    for (let index = startIndex; index > stopIndex; index--) {
      updateListByTokenIndex(index, contract);
    }
  };

  useEffect(() => {
    async function getPageCount() {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
      const contract = new ethers.Contract(contractAddress, ABI, provider);

      const NftBalance = (await contract.totalSupply()).toString();

      setPageCount(Math.ceil(parseInt(NftBalance, 10) / NUMBER_OF_NFT_IN_MANAGER_PAGE));
    }

    getPageCount();
  }, []);

  useEffect(() => {
    getNftByPage(page);
  }, [page]);

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
    <Page title="Univere Gallery">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} ref={ref}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <LineScalePulseOutRapid color={'#637381'} loading={loading} />
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
