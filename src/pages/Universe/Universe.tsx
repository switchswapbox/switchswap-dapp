import { useEffect, useState } from 'react';
import { Container, Stack, Grid, Pagination } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import Page from '../../components/Page';
import { contractAddress } from '../../utils/contractAddress';
import { NUMBER_OF_NFT_IN_MANAGER_PAGE } from '../../assets/COMMON_VARIABLES';
import { useMeasure } from 'react-use';
import { GridSize } from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import NftCard from '../../components/gallery/NftCard';
import { getNftByPage } from '../../utils/gallery/updateGallery';
import { ABI_UNIVERSE_NFT } from '../../constants/ABI_UNIVERSE_NFT';
import { CONTRACT_ADDRESS_UNIVERSE_NFT, POLYGON_RPC } from '../../constants';
import connectEVMContract from '../../utils/smartContractEVM/connectEVMContract';

export default function Universe() {
  const { pageUrl } = useParams();
  const navigate = useNavigate();

  const { themeStretch } = useSettings();
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
      const contract = connectEVMContract(
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
