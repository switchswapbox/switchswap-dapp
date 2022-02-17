import { Card, Container } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import Page from '../../components/Page';
import ConfigureSmartContract from './components/ConfigureSmartContract';
import DeploySmartContract from './components/DeploySmartContract';
import Introduction from './components/Introduction';

type FormSmartContractConfig = {
  name: string;
  symbol: string;
};

export default function CreateCollection() {
  const method = useForm<FormSmartContractConfig>();
  return (
    <Page title="Create NFTs Collection">
      <Container maxWidth={'lg'}>
        <Introduction />
        <Card sx={{ p: 3 }}>
          <FormProvider {...method}>
            <ConfigureSmartContract />
            <DeploySmartContract />
          </FormProvider>
        </Card>
      </Container>
    </Page>
  );
}
