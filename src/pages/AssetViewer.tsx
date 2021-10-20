// material
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function LearnMore() {
  const { themeStretch } = useSettings();
  const { network, contract, tokenId } = useParams();
  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {network}
        {contract} {tokenId}
      </Container>
    </Page>
  );
}
