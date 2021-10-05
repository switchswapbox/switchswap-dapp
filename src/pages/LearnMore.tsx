// material
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import ComingSoon from 'components/ComingSoon';
// ----------------------------------------------------------------------

export default function LearnMore() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ComingSoon />
      </Container>
    </Page>
  );
}
