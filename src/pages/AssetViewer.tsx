import { useEffect, useState } from 'react';

// material
import { Box, Container } from '@mui/material';

// hooks
import useSettings from '../hooks/useSettings';
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';

import { Asset } from 'components/_dashboard/assetViewer';

import Identicons from '@nimiq/identicons';
import { IPFS_GATEWAY_FOR_FETCHING_DATA, POLYGON_RPC } from 'assets/COMMON_VARIABLES';
import { contractAddress } from 'utils/contractAddress';
import { ethers } from 'ethers';
import { ABI } from 'utils/abi';
import axios from 'axios';
Identicons.svgPath = './static/identicons.min.svg';

export type AssetAndOwnerType = {
  ownerAddress: string;
  contractAddress: string;
  tokenId: string;
  ownerIcon: string;
  balance: string;
  imageUrl: string;
  name: string;
  description: string;
};
const initAssetAndOwner: AssetAndOwnerType = {
  ownerAddress: '',
  contractAddress: '',
  tokenId: '',
  ownerIcon: '',
  balance: '0',
  imageUrl: '',
  name: '',
  description: ''
};

const ipfsUriToCid = (ipfsUrl: string) => {
  const CidSearch = ipfsUrl.match(/(Qm[\w]+)/);
  if (CidSearch) {
    return CidSearch[1];
  } else return null;
};

export default function AssetViewer() {
  const { themeStretch } = useSettings();
  let networkRPC = '';

  const { network, contract, tokenId } = useParams();
  switch (network) {
    case 'polygon':
      networkRPC = POLYGON_RPC[0];
      break;
    default:
      networkRPC = '0';
  }

  const [assetAndOwner, setAssetAndOwner] = useState<AssetAndOwnerType>(initAssetAndOwner);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider(networkRPC);
      const contractEthersJs = new ethers.Contract(contractAddress, ABI, provider);

      const ownerOfNFT = await contractEthersJs.ownerOf(tokenId);
      const balanceOfOwner = (await contractEthersJs.balanceOf(ownerOfNFT)).toString();
      const tokenURI = await contractEthersJs.tokenURI(tokenId);

      const tokenURICid = ipfsUriToCid(tokenURI);

      Identicons.toDataUrl(ownerOfNFT).then((img: string) => {
        setAssetAndOwner((assetAndOwner) => ({
          ...assetAndOwner,
          ownerIcon: img,
          balance: balanceOfOwner,
          ownerAddress: ownerOfNFT,
          tokenId: tokenId || '',
          contractAddress
        }));
      });

      if (tokenURICid) {
        const tokenURIHttp = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${tokenURICid}`;
        axios.get(tokenURIHttp).then((response) => {
          const name = response.data.name || '';
          const description = response.data.description || '';

          if (response.data && response.data.image) {
            const imageCid = ipfsUriToCid(response.data.image);
            if (imageCid) {
              const imageUrl = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${imageCid}`;
              setAssetAndOwner((assetAndOwner) => ({
                ...assetAndOwner,
                imageUrl,
                name,
                description
              }));
            }
          }
        });
      }

      console.log(balanceOfOwner);
    }
    fetchData();
  }, []);

  return (
    <Page title="Asset Viewer">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box>
          <Asset assetAndOwner={assetAndOwner} />
        </Box>
      </Container>
    </Page>
  );
}
