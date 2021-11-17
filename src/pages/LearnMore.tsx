// material
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Faqs from 'components/Faqs';
// ----------------------------------------------------------------------

export default function LearnMore() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Faqs />
      </Container>
    </Page>
  );
}
