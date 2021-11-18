import { Container, Grid } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { Block } from '../../components/Block';
import MintingProcess from './components/MintingProcess';
import useLocales from 'hooks/useLocales';
export default function NftMinting() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  return (
    <Page title="NFT Minting">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Block title={translate(`mintingProcess.generate`)}>
              <MintingProcess />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
