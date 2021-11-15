import { useEffect, useState } from 'react';
import { Container, Grid, SvgIcon } from '@mui/material';
import { Icon } from '@iconify/react';
import useSettings from '../hooks/useSettings';
import useLocales from '../hooks/useLocales';
import Page from '../components/Page';
import {
  Welcome,
  NftPresentation,
  StatisticsCard,
  HomeTimeline,
  PROJECTUPDATES,
  ROADMAP
} from '../components/_dashboard/home';
import { CONTRACT_ADDRESS_UNIVERSE_NFT, POLYGON_RPC } from '../constants';
import connectEVMContract from 'utils/smartContractEVM/connectEVMContract';
import { ABI_UNIVERSE_NFT } from '../constants/ABI_UNIVERSE_NFT';

// ----------------------------------------------------------------------
export default function Home() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const [totalMintedNft, setTotalMintedNft] = useState(0);
  useEffect(() => {
    const contract = connectEVMContract(
      CONTRACT_ADDRESS_UNIVERSE_NFT,
      ABI_UNIVERSE_NFT,
      POLYGON_RPC
    );
    contract.totalSupply().then((totalSupply: any) => {
      setTotalMintedNft(parseInt(totalSupply));
    });
  }, []);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <Welcome displayName="NFT Minter" />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <NftPresentation />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatisticsCard text="Total Minted NFTs" value={totalMintedNft}>
              <SvgIcon>
                <Icon icon="bi:card-image" width="20" height="20" />
              </SvgIcon>
            </StatisticsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatisticsCard text="Locked NFTs value" value={0}>
              <SvgIcon>
                <Icon icon="fa-solid:user-lock" width="20" height="20" />
              </SvgIcon>
            </StatisticsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatisticsCard text="NFTs trading volumn" value={0}>
              <SvgIcon>
                <Icon icon="dashicons:money-alt" width="24" height="24" />
              </SvgIcon>
            </StatisticsCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <HomeTimeline title="Project Updates" timelines={PROJECTUPDATES} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HomeTimeline title="Roadmap" timelines={ROADMAP} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
