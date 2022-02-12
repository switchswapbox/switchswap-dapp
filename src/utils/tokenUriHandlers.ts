export function isHttpUri(tokenURI: string): boolean {
  return tokenURI.match(/^(http|https):\/\/[^ "]+$/) ? true : false;
}

export function isIpfsUri(tokenURI: string): boolean {
  return tokenURI.match(/^(ipfs|ipns):\/\//) ? true : false;
}

export function removeIpfsHeader(ipfsUri: string) {
  return ipfsUri.replace(/^(ipfs|ipns):\/\//, '');
}
