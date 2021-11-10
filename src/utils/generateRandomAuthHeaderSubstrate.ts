import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';

const generateRandomAuthHeaderSubstrate = async () => {
  // 1.1 get the seed phrase
  const seed = mnemonicGenerate();

  if (!seed) {
    throw new Error('seed phrase not found');
  }

  // 1.2 get a keypair
  const keyring = new Keyring();
  const pair = keyring.addFromUri(seed as string);

  // 1.3 get the signature of the addr
  const sigRaw = pair.sign(pair.address);
  const sig = u8aToHex(sigRaw);

  // 1.4 compile the sig to autHeader
  const authHeaderRaw = `sub-${pair.address}:${sig}`;
  const authHeader = Buffer.from(authHeaderRaw).toString('base64');

  return authHeader;
};

export default generateRandomAuthHeaderSubstrate;
