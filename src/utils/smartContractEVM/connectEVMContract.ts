import { ethers, Contract } from 'ethers';

const connectEVMContract = (contractAddress: string, ABI: ethers.ContractInterface): Contract => {
  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  return contract;
};

export default connectEVMContract;
