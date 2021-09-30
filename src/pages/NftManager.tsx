// material
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

// ----------------------------------------------------------------------
export default function PageFive() {
  const { themeStretch } = useSettings();
  const [isMetamaskInstalled, setMetamask] = useState(true);
  // WARNING: Use useSth to prevent re-create for each render
  const detectProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
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
        <Typography variant="h3" component="h1" paragraph>
          Page Five
        </Typography>
        <Button onClick={detectProvider}>Connect</Button>
        <Typography gutterBottom>
          Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc,
          vitae euismod ligula urna in dolor. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
          id, lorem. Phasellus blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam lorem ante, dapibus in,
          viverra quis, feugiat a, tellus. In consectetuer turpis ut velit. Aenean posuere, tortor
          sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
          Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Sed a libero.
        </Typography>
        <Typography>
          Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius
          laoreet. Curabitur ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat.
          Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque
          libero metus, condimentum nec, tempor a, commodo mollis, magna. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Cras dapibus.
        </Typography>
      </Container>
    </Page>
  );
}
