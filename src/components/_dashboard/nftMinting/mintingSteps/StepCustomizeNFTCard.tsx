import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  SvgIcon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Label from 'components/Label';
import svgArray from 'utils/svg-data';
import MetadataSummary from '../MetadataSummary';
import NftCardsDesign from '../NftCardsDesign';
import Scrollbar from 'components/Scrollbar';
import { Icon } from '@iconify/react';
import { changeCardTitle } from 'reduxStore/reducerCustomizeQRCard';
import { create } from 'ipfs-http-client';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import {
  IPFS_GATEWAY_W3AUTH,
  CRUST_WALLET_WIKI,
  METAMASK_SELECT_POLYGON_URL,
  INSTALL_METAMASK_URL
} from '../../../../assets/COMMON_VARIABLES';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { ethers } from 'ethers';
import { stringToHex } from '@polkadot/util';
import { VariantType } from 'notistack';
import { MintingContext } from './minting.context';
import { pinW3Crust } from './StepUploadFile';
import detectEthereumProvider from '@metamask/detect-provider';
import CustomizeQRNormal from '../qrCardCustomize/CustomizeQRNormal';

const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];

type StepCustomizeNFTCardProps = {
  handleAlignment: (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => void;
  onSnackbarAction: (color: VariantType, text: string, url?: string | undefined) => void;
};

function StepCustomizeNFTCard({ handleAlignment, onSnackbarAction }: StepCustomizeNFTCardProps) {
  const [isMetadataUploading, setMetadataUploading] = useState(false);
  const {
    nameNft,
    setNameNft,
    descNft,
    setDescNft,
    uploadedCid,
    stepTwoNotDone,
    setStepTwoNotDone,
    setMetadataCid,
    srcImage,
    alignment,
    metadataCid
  } = useContext(MintingContext);

  const dispatch = useDispatch();
  const handleNameNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameNft(event.target.value);
    dispatch(
      changeCardTitle({
        title: event.target.value
      })
    );
  };

  const handleDescNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescNft(event.target.value);
  };

  function uploadMetadataW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setMetadataUploading(true);
      const ipfs = create({
        url: ipfsGateway + '/api/v0',
        headers: {
          authorization: 'Basic ' + authHeader
        }
      });
      const metadata = {
        name: nameNft,
        description: descNft,
        image: `ipfs://${uploadedCid.cid}`,
        fileName: uploadedCid.name,
        size: uploadedCid.size
      };
      ipfs
        .add(JSON.stringify(metadata))
        .then((added) => {
          console.log(added);
          setStepTwoNotDone(false);
          setMetadataUploading(false);
          setStepTwoNotDone(false);
          setMetadataCid(added.cid.toV0().toString());
          resolve({ cid: added.cid.toV0().toString(), size: added.size });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  const uploadMetadataCrust = async () => {
    const extensions = await web3Enable('NFT Dapp');
    if (extensions.length === 0) {
      onSnackbarAction('warning', 'Please install Crust Wallet', CRUST_WALLET_WIKI);
      return;
    }
    const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();

    let crustAccountIndex = parseInt(localStorage.getItem('selectedAccountCrustIndex') || '0', 10);

    crustAccountIndex =
      crustAccountIndex < allAccounts.length && crustAccountIndex >= 0 ? crustAccountIndex : 0;

    const account = allAccounts[crustAccountIndex];

    const injector = await web3FromSource(account.meta.source);

    const signRaw = injector?.signer?.signRaw;

    let signature = '';
    if (!!signRaw) {
      // after making sure that signRaw is defined
      // we can use it to sign our message
      signature = (
        await signRaw({
          address: account.address,
          data: stringToHex(account.address),
          type: 'bytes'
        })
      ).signature;
    }
    const authHeader = Buffer.from(`sub-${account.address}:${signature}`).toString('base64');

    uploadMetadataW3GatewayPromise(authHeader)
      .then((metadataInfo) => {
        pinW3Crust(authHeader, metadataInfo.cid, 'metadata');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadMetadataMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        await provider.request({ method: 'eth_requestAccounts' });

        const providerEthers = new ethers.providers.Web3Provider(provider);

        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const signature = await signer.signMessage(addr);

        const authHeader = Buffer.from(`pol-${addr}:${signature}`).toString('base64');

        uploadMetadataW3GatewayPromise(authHeader)
          .then((metadataInfo) => {
            pinW3Crust(authHeader, metadataInfo.cid, 'metadata');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        onSnackbarAction(
          'warning',
          'Please select Polygon Network from Metamask',
          METAMASK_SELECT_POLYGON_URL
        );
      }
    } else {
      onSnackbarAction('warning', 'Please install Metamask', INSTALL_METAMASK_URL);
    }
  };

  return (
    <>
      <Grid container direction="column" rowSpacing={10} sx={{ pt: 5 }}>
        <Grid item xs={12}>
          <Stack alignItems="center" justifyContent="center">
            <Box sx={{ borderRadius: 2 }} component="img" src={srcImage} />
          </Stack>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={7}>
              <NftCardsDesign nftCards={svgArray} />
            </Grid>
            <Grid container xs={12} md={12} lg={5} sx={{ ml: { xs: 5, md: 5, lg: 0 } }}>
              <Grid item xs={12}>
                <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase' }}>
                  Creating Metadata
                </Label>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{
                    mt: 2,
                    mb: 0
                  }}
                >
                  Title<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  multiline
                  type="string"
                  required={true}
                  defaultValue={nameNft}
                  onChange={handleNameNftInputChange}
                  disabled={!stepTwoNotDone}
                />

                <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Description
                  </Typography>
                </Box>

                <TextField
                  rows={3}
                  fullWidth
                  variant="standard"
                  multiline
                  size="small"
                  placeholder="Enter what is so cool about my NFT"
                  type="string"
                  defaultValue={descNft}
                  onChange={handleDescNftInputChange}
                  disabled={!stepTwoNotDone}
                />
              </Grid>
              <Grid item xs={12}>
                <MetadataSummary otherQRProps={<CustomizeQRNormal />} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {isMetadataUploading ? (
        <LinearProgress color="info" sx={{ my: 3 }} />
      ) : (
        <Divider sx={{ my: 3 }} />
      )}
      <Grid
        container
        sx={{
          // borderRadius: 1,
          // border: (theme) => `solid 1px ${theme.palette.divider}`,
          bgcolor: 'background.paper'
        }}
        spacing={1}
      >
        <Grid item xs={12} md={3}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ height: '100%' }}>
            <Typography variant="h6">Upload Metadata</Typography>
            <Tooltip
              TransitionComponent={Zoom}
              title="Upload and pin freely to Crust Network with W3Auth. Sign a message with your prefered network to use the service."
            >
              <HelpOutlineIcon />
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Scrollbar sx={{ maxWidth: '331px' }}>
              <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                <ToggleButton
                  value="crust"
                  sx={{ minWidth: '56px' }}
                  onClick={uploadMetadataCrust}
                  disabled={!stepTwoNotDone}
                >
                  <Box
                    component="img"
                    src="./static/icons/shared/crust.svg"
                    sx={{ height: '24px', width: '32px' }}
                  />
                </ToggleButton>
                <ToggleButton
                  value="polygon"
                  sx={{ minWidth: '56px' }}
                  onClick={uploadMetadataMetamask}
                  disabled={!stepTwoNotDone}
                >
                  <Box
                    component="img"
                    src="./static/icons/shared/polygon.svg"
                    sx={{ height: '24px', width: '32px' }}
                  />
                </ToggleButton>
                <ToggleButton value="solana" sx={{ minWidth: '56px' }} disabled>
                  <Box
                    component="img"
                    src="./static/icons/shared/solana.svg"
                    sx={{ height: '24px', width: '32px' }}
                  />
                </ToggleButton>
                <ToggleButton value="ethereum" sx={{ minWidth: '56px' }} disabled>
                  <Box
                    component="img"
                    src="./static/icons/shared/ethereum.svg"
                    sx={{ height: '24px', width: '32px' }}
                  />
                </ToggleButton>
                <ToggleButton value="near" sx={{ minWidth: '56px' }} disabled>
                  <Box
                    component="img"
                    src="./static/icons/shared/near.svg"
                    sx={{ height: '24px', width: '32px' }}
                  />
                </ToggleButton>
                <ToggleButton value="avalanche" sx={{ minWidth: '56px' }} disabled>
                  <Box
                    component="img"
                    src="./static/icons/shared/avalanche.svg"
                    sx={{ height: '24px', width: '32px' }}
                  />
                </ToggleButton>
              </ToggleButtonGroup>
            </Scrollbar>
          </Stack>
        </Grid>
      </Grid>
      {isMetadataUploading ? (
        <LinearProgress variant="query" color="info" sx={{ my: 3 }} />
      ) : (
        <Divider sx={{ my: 3 }} />
      )}
      {metadataCid !== '' && (
        <Box
          sx={{
            my: 1,
            px: 2,
            py: 1,
            borderRadius: 1,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            bgcolor: '#C8FACD'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SvgIcon color="action">
              <Icon icon="teenyicons:certificate-outline" color="black" />
            </SvgIcon>
            <Stack direction="column">
              <Typography variant="subtitle2">Uploaded successfully to Crust Network</Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                CID: {metadataCid}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default StepCustomizeNFTCard;
