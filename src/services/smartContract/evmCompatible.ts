import { ethers, Contract } from 'ethers';
import asyncWithCache from '../../utils/asyncWithCache';

export function connectContract(
  contractAddress: string,
  ABI: ethers.ContractInterface,
  providerRpc: string
): Contract {
  const provider = new ethers.providers.JsonRpcProvider(providerRpc);
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  return contract;
}
// FIXME: Potentially, An issue when a same contract address on 2 different chains.
export async function getTotalSupply(contract: Contract): Promise<number> {
  const NftBalance = await asyncWithCache(
    contract.totalSupply,
    contract.address + '-getTotalSupply'
  );
  return NftBalance.toNumber();
}

export async function getTokenURI(contract: Contract, tokenId: number): Promise<string> {
  return asyncWithCache(
    contract.tokenURI.bind(null, tokenId),
    contract.address + '-getTokenURI-' + tokenId
  );
}

export async function getOwner(contract: Contract, tokenId: number): Promise<string> {
  return asyncWithCache(
    contract.ownerOf.bind(null, tokenId),
    contract.address + '-ownerOf-' + tokenId
  );
}

export async function getName(contract: Contract): Promise<string> {
  return asyncWithCache(contract.name, contract.address + '-getName');
}

export async function getSymbol(contract: Contract): Promise<string> {
  return asyncWithCache(contract.symbol, contract.address + '-getSymbol');
}
