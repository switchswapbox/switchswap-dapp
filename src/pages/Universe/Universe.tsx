import { useEffect, useState } from 'react';
import { Container, Stack, Grid, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import Page from '../../components/Page';
import { contractAddress } from '../../utils/contractAddress';
import { NUMBER_OF_NFT_IN_MANAGER_PAGE } from '../../constants/COMMON_VARIABLES';

import { useParams } from 'react-router-dom';
import NftCard from '../../components/gallery/NftCard';
import { getNftByPage } from '../../utils/gallery/updateGallery';
import { ABI_UNIVERSE_NFT } from '../../constants/ABI_UNIVERSE_NFT';
import { CONTRACT_ADDRESS_UNIVERSE_NFT, POLYGON_RPC } from '../../constants';
import { connectContract } from '../../services/smartContract/evmCompatible';

export default function Universe() {
  const { pageUrl } = useParams();
  const navigate = useNavigate();

  const [NftList, setNftList] = useState<
    { tokenId: string; tokenURI: string; imageUrl: string; name: string; owner?: string }[]
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

  useEffect(() => {
    async function getPageCount() {
      const contract = connectContract(
        CONTRACT_ADDRESS_UNIVERSE_NFT,
        ABI_UNIVERSE_NFT,
        POLYGON_RPC
      );
      const NftBalance = (await contract.totalSupply()).toString();
      setPageCount(Math.ceil(parseInt(NftBalance, 10) / NUMBER_OF_NFT_IN_MANAGER_PAGE));
    }
    getPageCount();
  }, []);

  useEffect(() => {
    getNftByPage(page, setLoading, setNftList);
  }, [page]);

  return (
    <Page title="Univere Gallery">
      <Container maxWidth="lg">
        <Grid container spacing={0}>
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
