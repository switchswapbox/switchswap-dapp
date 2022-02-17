import { JsonRpcSigner, TransactionReceipt } from '@ethersproject/providers';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import { ContractFactory } from 'ethers';
const CONTRACT_NAME = 'MyContract';

export const deploySmartContract = async (
  compileResult: CompilerAbstract,
  signer: JsonRpcSigner
): Promise<TransactionReceipt | undefined> => {
  try {
    const compiledContract = compileResult?.getContract(CONTRACT_NAME);
    const contractBinary = '0x' + compiledContract?.object.evm.bytecode.object;
    const contractABI = compiledContract?.object.abi;

    const contractFactory: ContractFactory = new ContractFactory(
      contractABI,
      contractBinary,
      signer
    );

    const deployingContract = await contractFactory.deploy();
    const txReceipt = await deployingContract.deployTransaction.wait(1);
    console.log('success');
    console.log('transactionReceipt: ', txReceipt);
    return txReceipt;
  } catch (e) {
    console.log('Error on deploying', e);
  }
};
