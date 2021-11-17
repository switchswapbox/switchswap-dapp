import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import { Asset } from './components';
import Identicons from '@nimiq/identicons';
import { IPFS_GATEWAY_FOR_FETCHING_DATA, POLYGON_RPC } from '../../assets/COMMON_VARIABLES';
import { contractAddress } from '../../utils/contractAddress';
import { ethers } from 'ethers';
import { ABI } from 'utils/abi';
import axios from 'axios';
import { ipfsUriToCid } from '../../utils/gallery/ipfsUriToCid';
import type { AssetAndOwnerType } from './AssetViewer.types';

Identicons.svgPath = './static/identicons.min.svg';

const initAssetAndOwner: AssetAndOwnerType = {
  ownerAddress: '',
  contractAddress: '',
  tokenId: '',
  ownerIcon: '',
  balance: '0',
  imageUrl: '',
  name: '',
  description: '',
  contentId: '',
  nftCardId: '',
  metadataId: ''
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

      contractEthersJs.getDataIdOnchain(tokenId).then((contentId: string) => {
        setAssetAndOwner((assetAndOwner) => ({
          ...assetAndOwner,
          contentId: ipfsUriToCid(contentId) || ''
        }));
      });

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
        setAssetAndOwner((assetAndOwner) => ({
          ...assetAndOwner,
          metadataId: tokenURICid
        }));

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
                description,
                nftCardId: imageCid
              }));
            }
          }
        });
      }
    }
    fetchData();
  }, []);

  return (
    <Page title={`Asset Viewer - ${assetAndOwner.name}`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box>
          <Asset assetAndOwner={assetAndOwner} />
        </Box>
      </Container>
    </Page>
  );
}
