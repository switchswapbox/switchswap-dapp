import { TransactionReceipt } from '@ethersproject/providers';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import * as etherscanClient from '../../../clients/etherscan-client';
import {
  SOLIDITY_COMPILER_VERSION,
  SPDX_LICENSE_IDENTIFIER
} from '../../../constants/solcEnvironments';
const CONTRACT_FILE_NAME = 'MyContract.sol';
const CONTRACT_NAME = 'MyContract';
const ETHERSCAN_API_SECRET_KEY = 'G1UDIXWQ3YZRNQJ6CVVNYZQF1AAHD1JGTK';

export const publishSmartContract = async (
  chainId: number,
  txReceipt?: TransactionReceipt,
  compileResult?: CompilerAbstract
): Promise<string | undefined> => {
  try {
    const verifiedResponse = await etherscanClient.verifyAndPublicContractSourceCode(
      ETHERSCAN_API_SECRET_KEY,
      chainId + '',
      {
        address: txReceipt?.contractAddress || '',
        name: CONTRACT_FILE_NAME + ':' + CONTRACT_NAME,
        sourceCode: JSON.stringify({
          sources: compileResult?.source.sources,
          language: 'Solidity'
        }),
        compilerversion: 'v' + SOLIDITY_COMPILER_VERSION,
        licenseType: SPDX_LICENSE_IDENTIFIER.MIT
      }
    );
    console.log('verifiedResponse: ', verifiedResponse.data);
    if (verifiedResponse.data.status === '0') {
      console.log('error publishing');
      return;
    }
    if (verifiedResponse.data.status === '1') {
      console.log('success publishing', verifiedResponse.data.result);
    }
    // return etherscan publishing hash
    return (verifiedResponse.data as any).result;
  } catch (e) {
    console.log('Error on publishing', e);
  }
};
