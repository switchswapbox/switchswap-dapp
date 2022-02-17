import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Container } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Page from '../../components/Page';
import ConfigureSmartContract from './components/ConfigureSmartContract';
import DeploySmartContract from './components/DeploySmartContract';
import Introduction from './components/Introduction';

type FormSmartContractConfig = {
  name: string;
  symbol: string;
};

const FormSmartContractSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  symbol: Yup.string().required('Symbol is required')
});

export default function CreateCollection() {
  const method = useForm<FormSmartContractConfig>({
    mode: 'onTouched',
    resolver: yupResolver(FormSmartContractSchema)
  });

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
