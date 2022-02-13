import { ethers, Contract } from 'ethers';

export function connectContract(
  contractAddress: string,
  ABI: ethers.ContractInterface,
  providerRpc: string
): Contract {
  const provider = new ethers.providers.JsonRpcProvider(providerRpc);
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  return contract;
}

export async function getTotalSupply(contract: Contract): Promise<number> {
  const NftBalance = await contract.totalSupply();
  return NftBalance.toNumber();
}

export function getTokens(contract: Contract) {
  return 0;
}

export async function getTokenURI(contract: Contract, tokenId: number): Promise<string> {
  const tokenURI = await contract.tokenURI(tokenId);
  return tokenURI;
}

export async function getOwner(contract: Contract, tokenId: number): Promise<string> {
  const owner = await contract.ownerOf(tokenId);
  return owner;
}
