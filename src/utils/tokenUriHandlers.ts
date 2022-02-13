export function isHttpUri(tokenURI: string): boolean {
  return tokenURI.match(/^(http|https):\/\/[^ "]+$/) ? true : false;
}

export function isHttpUriOrThrowError(tokenURI: string): void {
  if (!isHttpUri(tokenURI)) {
    throw new Error('Not a valid URI');
  }
}

export function isIpfsUri(tokenURI: string): boolean {
  return tokenURI.match(/^(ipfs|ipns):\/\//) ? true : false;
}

export function removeIpfsHeader(ipfsUri: string) {
  return ipfsUri.replace(/^(ipfs|ipns):\/\//, '');
}

const IPFS_GATEWAY_FOR_FETCHING_DATA = 'https://ipfs.io/ipfs/';

export function parseNftUri(tokenUri: string): string {
  if (isHttpUri(tokenUri)) {
    return tokenUri;
  } else if (isIpfsUri(tokenUri)) {
    return `${IPFS_GATEWAY_FOR_FETCHING_DATA}${removeIpfsHeader(tokenUri)}`;
  } else {
    throw new Error('Not a valid URI: ' + tokenUri);
  }
}
