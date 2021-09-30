import { Keyring } from '@polkadot/keyring';

export function shortenAddress(address: string, len: number) {
  return `${address.substr(0, len)}...${address.substr(address.length - len, address.length)}`;
}

export function getCrustMainnetAddress(address: string) {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const decodedAddress = keyring.decodeAddress(address);
  return keyring.encodeAddress(decodedAddress, 66);
}
