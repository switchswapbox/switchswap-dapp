import { Container } from '@mui/material';
import Page from 'components/Page';
import { useLocation } from 'react-router-dom';
import NftForm from './components/NftForm';

export default function MintNft() {
  const { pathname } = useLocation();

  const isEdit = pathname.includes('edit');

  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <NftForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
