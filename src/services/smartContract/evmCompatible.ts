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

export async function getTokenURI(contract: Contract, tokenId: number): Promise<string> {
  return contract.tokenURI(tokenId);
}

export async function getOwner(contract: Contract, tokenId: number): Promise<string> {
  return contract.ownerOf(tokenId);
}

export async function getName(contract: Contract): Promise<string> {
  return contract.name();
}

export async function getSymbol(contract: Contract): Promise<string> {
  return contract.symbol();
}
