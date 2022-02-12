import { Keyring } from '@polkadot/keyring';

function shortenAddress(address: string, len: number) {
  return address.length > 2 * len + 3
    ? `${address.substring(0, len)}...${address.substring(address.length - len, address.length)}`
    : address;
}

function shortenAddressHeader(address: string, len: number) {
  return address.length > len ? address.substring(address.length - len, address.length) : address;
}

function getCrustMainnetAddress(address: string) {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const decodedAddress = keyring.decodeAddress(address);
  return keyring.encodeAddress(decodedAddress, 66);
}

export { shortenAddress, shortenAddressHeader, getCrustMainnetAddress };
