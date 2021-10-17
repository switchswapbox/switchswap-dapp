import * as Yup from 'yup';

import { Keyring } from '@polkadot/api';
import { hexToU8a, isHex } from '@polkadot/util';

const keyring = new Keyring();

const isValidSubstrateAddress = (address: string) => {
  try {
    keyring.encodeAddress(isHex(address) ? hexToU8a(address) : keyring.decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
};

const CruFormSchema = Yup.object().shape({
  address: Yup.string()
    .required('Address is required')
    .test('test-address', 'Address non valid', (value, context) => {
      return isValidSubstrateAddress(value || '');
    }),
  token: Yup.string(),
  tweetUrl: Yup.string().required('Tweet URL is required').url('Not an URL')
});

export default CruFormSchema;
