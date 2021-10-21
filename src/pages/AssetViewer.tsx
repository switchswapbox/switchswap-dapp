import { useEffect, useState } from 'react';
import { capitalCase } from 'change-case';

// material
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

// hooks
import useSettings from '../hooks/useSettings';
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';
import { Block } from 'components/Block';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Asset } from 'components/_dashboard/assetViewer';

import { Icon } from '@iconify/react';

import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import Identicons from '@nimiq/identicons';
import { IPFS_GATEWAY_FOR_FETCHING_DATA, POLYGON_RPC } from 'assets/COMMON_VARIABLES';
import { contractAddress } from 'utils/contractAddress';
import { ethers } from 'ethers';
import { ABI } from 'utils/abi';
import axios from 'axios';
Identicons.svgPath = './static/identicons.min.svg';
// ----------------------------------------------------------------------
const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

export type AssetAndOwnerType = {
  ownerAddress: string;
  ownerIcon: string;
  balance: string;
  imageUrl: string;
  name: string;
  description: string;
};
const initAssetAndOwner: AssetAndOwnerType = {
  ownerAddress: '',
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

  const [currentTab, setCurrentTab] = useState('asset');
  const [assetAndOwner, setAssetAndOwner] = useState<AssetAndOwnerType>(initAssetAndOwner);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
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
          ownerAddress: ownerOfNFT
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

  const PROFILE_TABS = [
    {
      value: 'asset',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Asset assetAndOwner={assetAndOwner} />
    },
    // {
    //   value: 'followers',
    //   icon: <Icon icon={heartFill} width={20} height={20} />
    // },
    // {
    //   value: 'friends',
    //   icon: <Icon icon={peopleFill} width={20} height={20} />
    // },
    {
      value: 'gallery',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <Box />
    }
  ];

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
