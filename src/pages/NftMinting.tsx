// material
import { Container, Grid } from '@mui/material';

// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { Block } from '../components/Block';
import MintingProcess from '../components/_dashboard/nftMinting/MintingProcess';

export default function NftMinting() {
  const { themeStretch } = useSettings();

  return (
    <Page title="NFT Minting">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Block title="Generate NFT">
              <MintingProcess />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
