import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

type FormValuesProps = {
  address: string;
  token: string;
  tweetUrl: string;
};

const FormSchema = Yup.object().shape({
  address: Yup.string()
    .required('Address is required')
    .min(6, 'Mininum 6 characters')
    .max(50, 'Maximum 50 characters'),
  token: Yup.string(),
  tweetUrl: Yup.string().required('Tweet URL is required').url('Not an URL')
});

type FaucetFormProps = { token: string };

export default function FaucetForm({ token }: FaucetFormProps) {
  const defaultValues = {
    address: '',
    token,
    tweetUrl: ''
  };

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

  useEffect(() => {
    console.log(watchingUrl);
  }, [watchingUrl]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log(data);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await axios.post('https://token-faucet.herokuapp.com/get-faucet', {
      tweetUrl: 'https://twitter.com/switchswapbox/status/1440795467747520517?s=20',
      address: 'cTJebFxafy1iqk7NGgMyYw7iRH2egKp8geqnnHsZMrf2Q9vTs',
      token: 'CRU'
    });

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
                label="Address"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

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
            Get Faucet
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
