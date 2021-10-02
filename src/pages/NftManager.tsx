// material
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import ComingSoon from 'components/ComingSoon';

// ----------------------------------------------------------------------
export default function PageFive() {
  const { themeStretch } = useSettings();
  const [isMetamaskInstalled, setMetamask] = useState(true);
  // WARNING: Use useSth to prevent re-create for each render
  const detectProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      // From now on, this should always be true:
      // provider === window.ethereum

      const chainId = await provider.request({
        method: 'eth_chainId'
      });
      console.log(chainId);
      if (parseInt(chainId, 16) === 137) {
        const status = await provider.request({ method: 'eth_requestAccounts' });
        console.log(status);
        const providerEthers = new ethers.providers.Web3Provider(provider);
        const signer = providerEthers.getSigner();
        console.log(signer);
        const add = await signer.getAddress();
        console.log(add);
        const si = await signer.signMessage(
          ethers.utils.arrayify('0x5a292ff2e5E4caA4A441c8DB3f7cE065Ad4753Bf')
        );
        console.log(si);
        // provider.on('accountsChanged', function (accounts: any) {
        //   console.log(accounts);
        //   // Time to reload your interface with accounts[0]!
        // });
      } else {
        setMetamask(true);
        console.log('Select Polygon');
      }
    } else {
      setMetamask(false);
      console.log('Please install MetaMask!');
    }
  };

  return (
    <Page title="Page Five">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ComingSoon />
      </Container>
    </Page>
  );
}
