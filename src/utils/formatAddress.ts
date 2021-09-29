export function shortenAddress(address: string, len: number) {
  return `${address.substr(0, len)}...${address.substr(address.length - len, address.length)}`;
}
