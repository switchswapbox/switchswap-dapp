import * as Yup from 'yup';
import { ethers } from 'ethers';

const MaticFormSchema = Yup.object().shape({
  address: Yup.string()
    .required('Address is required')
    .test('test-address', 'Address non valid', (value, context) => {
      return ethers.utils.isAddress((value || '').toLowerCase());
    }),
  token: Yup.string(),
  tweetUrl: Yup.string().required('Tweet URL is required').url('Not an URL')
});

export default MaticFormSchema;
