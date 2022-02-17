import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { GET_FAUCET_API } from 'constants/COMMON_VARIABLES';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useLocales from '../../hooks/useLocales';
import { ResponseFaucetRequest } from '../../interfaces/faucet';
import CruFormSchema from './CruFormSchema';
import MaticFormSchema from './MaticFormSchema';

type FormValuesProps = {
  address: string;
  token: string;
  tweetUrl: string;
};

type FaucetHookFormProps = {
  token: string;
  setTweetId: React.Dispatch<React.SetStateAction<string>>;
  setResponse: React.Dispatch<React.SetStateAction<ResponseFaucetRequest>>;
};

export default function FaucetHookForm({ token, setTweetId, setResponse }: FaucetHookFormProps) {
  const defaultValues = {
    address: '',
    token,
    tweetUrl: ''
  };

  let FormSchema = MaticFormSchema;

  switch (token) {
    case 'MATIC':
      FormSchema = MaticFormSchema;
      break;
    case 'CRU':
      FormSchema = CruFormSchema;
      break;
    default:
      FormSchema = MaticFormSchema;
  }

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty }
  } = useForm<FormValuesProps>({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues
  });

  const watchingUrl = watch('tweetUrl');
  const { translate } = useLocales();

  useEffect(() => {
    const tweetIdReg = /\/status\/([0-9]+)/;
    const searchTweetId = watchingUrl.match(tweetIdReg);

    if (searchTweetId && searchTweetId[1]) {
      setTweetId(searchTweetId[1]);
    }
  }, [watchingUrl, setTweetId]);

  const onSubmit = async (data: FormValuesProps) => {
    const result = await axios.post(GET_FAUCET_API, data);
    setResponse(result.data);

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Wallet address"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          <Divider />
          <Stack>
            <Typography variant="h6">{translate(`funBox.requirement`)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', my: 1 }}>
              {translate(`funBox.keywords`)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', my: 1 }}>
              {translate(`funBox.useDefault`)}
            </Typography>
            <Button
              variant="contained"
              href="https://twitter.com/intent/tweet?text=Mint%20your%20decentralized%20NFT%20freely%20on%20switchswap%0A%23web3%20%23ipfs%20%23switchswap%20%23crustnetwork%20%23polygon%0Ahttps%3A//switchswap.io"
              target="_blank"
              startIcon={<Icon icon="logos:twitter" />}
            >
              {translate(`funBox.quickTweet`)}
            </Button>
          </Stack>

          <Controller
            name="tweetUrl"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Tweet URL"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <LoadingButton
            fullWidth
            color="info"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirty}
          >
            {translate(`funBox.getFaucet`)}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
