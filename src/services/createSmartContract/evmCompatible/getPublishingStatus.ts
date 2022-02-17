import * as etherscanClient from '../../../clients/etherscan-client';
const ETHERSCAN_API_SECRET_KEY = 'G1UDIXWQ3YZRNQJ6CVVNYZQF1AAHD1JGTK';

export const getPublishingStatus = async (etherscanPublishingHx: string, chainId: number) => {
  try {
    const verifyStatusResponse = await etherscanClient.codeVerificationStatus(
      ETHERSCAN_API_SECRET_KEY,
      chainId + '',
      etherscanPublishingHx
    );
    if (
      verifyStatusResponse.data.status === '1' ||
      verifyStatusResponse.data.message === 'Already Verified'
    ) {
      console.log('success verifying');
    } else {
      console.log('error verifying');
      return;
    }
    console.log('verifyStatusResponse : ', verifyStatusResponse.data);
    return verifyStatusResponse.data;
  } catch (e) {
    console.log('Error on verifying', e);
  }
};
