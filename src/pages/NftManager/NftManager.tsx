import { useEffect, useState } from 'react';
import { Container, Stack, Grid, Pagination } from '@mui/material';
import { GridSize } from '@mui/material/Grid';

import useSettings from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { useMeasure } from 'react-use';

import { LineScalePulseOutRapid } from 'react-pure-loaders';
import Page from '../../components/Page';
import { ethers } from 'ethers';
import { contractAddress } from '../../utils/contractAddress';

import { NUMBER_OF_NFT_IN_MANAGER_PAGE } from '../../constants/COMMON_VARIABLES';
import { useParams } from 'react-router-dom';
import NftCard from '../../components/gallery/NftCard';
import { getNftByPageManager } from '../../utils/gallery/updateGallery';
import { ABI_UNIVERSE_NFT } from '../../constants/ABI_UNIVERSE_NFT';
import { CONTRACT_ADDRESS_UNIVERSE_NFT, POLYGON_RPC } from '../../constants';
import { connectContract } from '../../services/smartContract/evmCompatible';

export default function NftManager() {
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
      navigate(`/nft-manager/${value}`);
    }
  };

  useEffect(() => {
    getNftByPageManager(page, selectedMetamaskAccount, setLoading, setNftList);
  }, [page, selectedMetamaskAccount]);

  useEffect(() => {
    async function getPageCount() {
      if (ethers.utils.isAddress(selectedMetamaskAccount)) {
        const contract = connectContract(
          CONTRACT_ADDRESS_UNIVERSE_NFT,
          ABI_UNIVERSE_NFT,
          POLYGON_RPC
        );
        const NftBalance = (await contract.balanceOf(selectedMetamaskAccount)).toString();

        setPageCount(Math.ceil(parseInt(NftBalance, 10) / NUMBER_OF_NFT_IN_MANAGER_PAGE));
      }
    }
    getPageCount();
  }, [selectedMetamaskAccount]);

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [lgCol, setLgCol] = useState<GridSize>(4);

  useEffect(() => {
    if (width > 1000) {
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
