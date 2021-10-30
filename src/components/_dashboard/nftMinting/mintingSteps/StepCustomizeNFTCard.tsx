import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import MetadataSummary from '../MetadataSummary';
import Scrollbar from 'components/Scrollbar';
import { Icon } from '@iconify/react';
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
import { pinW3Crust } from './StepUploadFile';
import detectEthereumProvider from '@metamask/detect-provider';
import qrStyles from '../qrCardCustomize';
import { IRootState } from 'reduxStore';
import { changeQRCardGeneralInfo, qrStyleNameType } from 'reduxStore/reducerCustomizeQRCard';
import { changeMintingProcessState } from 'reduxStore/reducerMintingProcess';
import SliderSVGCard from '../NftCardsDesign';
import html2canvas from 'html2canvas';
import useSnackbarAction from 'hooks/useSnackbarAction';

const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];

type StepCustomizeNFTCardProps = {
  handleAlignment: (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => void;
};

function TitleAndDescription() {
  const { stepTwoNotDone, nameNft, descNft } = useSelector((state: IRootState) => {
    return {
      stepTwoNotDone: state.reducerMintingProcess.stepTwoNotDone,
      nameNft: state.reducerMintingProcess.nameNft,
      descNft: state.reducerMintingProcess.descNft
    };
  });
  const dispatch = useDispatch();

  const handleNameNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMintingProcessState({ nameNft: event.target.value }));
    dispatch(
      changeQRCardGeneralInfo({
        title: event.target.value
      })
    );
  };

  const handleDescNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMintingProcessState({ descNft: event.target.value }));
  };

  return (
    <>
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
    </>
  );
}

function StepCustomizeNFTCard({ handleAlignment }: StepCustomizeNFTCardProps) {
  const [isMetadataUploading, setMetadataUploading] = useState(false);
  const onSnackbarAction = useSnackbarAction();

  let nftCardCidTemp = '';

  const {
    nftType,
    stepTwoNotDone,
    nameNft,
    descNft,
    alignment,
    uploadedCid,
    metadataCid,
    nftCardCid,
    srcImage,
    qrStyleName
  } = useSelector((state: IRootState) => {
    return {
      nftType: state.reducerMintingProcess.nftType,
      stepTwoNotDone: state.reducerMintingProcess.stepTwoNotDone,
      nameNft: state.reducerMintingProcess.nameNft,
      descNft: state.reducerMintingProcess.descNft,
      alignment: state.reducerMintingProcess.alignment,
      uploadedCid: state.reducerMintingProcess.uploadedCid,
      metadataCid: state.reducerMintingProcess.metadataCid,
      nftCardCid: state.reducerMintingProcess.nftCardCid,
      srcImage: state.reducerMintingProcess.srcImage,
      qrStyleName: state.reducerCustomizeQRCard.qrStyleName
    };
  });
  const dispatch = useDispatch();

  const { CustomProps } = qrStyles[qrStyleName as qrStyleNameType];

  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    const searchMime = arr[0].match(/:(.*?);/);
    let mime = '';
    if (searchMime && searchMime[1]) {
      mime = searchMime[1];
    }

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  function uploadNFTCardW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const nftCard = document.getElementById('nftCard') as HTMLElement;
      html2canvas(nftCard, {
        foreignObjectRendering: false,
        scale: 4
      })
        .then(function (canvas) {
          let pngDataUrl = canvas.toDataURL('image/png'); // default png
          const pngBlob = dataURLtoBlob(pngDataUrl);
          const ipfs = create({
            url: ipfsGateway + '/api/v0',
            headers: {
              authorization: 'Basic ' + authHeader
            }
          });
          ipfs.add(pngBlob as Blob).then((added) => {
            nftCardCidTemp = added.cid.toV0().toString();
            dispatch(changeMintingProcessState({ nftCardCid: added.cid.toV0().toString() }));
            resolve({ cid: added.cid.toV0().toString(), size: added.size });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  function uploadMetadataW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const ipfs = create({
        url: ipfsGateway + '/api/v0',
        headers: {
          authorization: 'Basic ' + authHeader
        }
      });
      console.log(
        `ipfs://${
          nftType !== 'withoutNftCard' ? nftCardCidTemp : uploadedCid ? uploadedCid.cid : ''
        }`
      );
      console.log(nftCardCidTemp);
      const metadata = {
        name: nameNft,
        description: descNft,
        image: `ipfs://${
          nftType !== 'withoutNftCard' ? nftCardCidTemp : uploadedCid ? uploadedCid.cid : ''
        }`,
        fileId: uploadedCid ? `ipfs://${uploadedCid.cid}` : '',
        fileName: uploadedCid ? uploadedCid.name : '',

        size: uploadedCid ? uploadedCid.size : 0
      };
      ipfs
        .add(JSON.stringify(metadata))
        .then((added) => {
          setMetadataUploading(false);
          dispatch(changeMintingProcessState({ stepTwoNotDone: false }));
          dispatch(changeMintingProcessState({ metadataCid: added.cid.toV0().toString() }));
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
      onSnackbarAction(
        'warning',
        'Please install Crust Wallet',
        null,
        'LEARN MORE',
        CRUST_WALLET_WIKI
      );
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

    setMetadataUploading(true);

    if (nftType !== 'withoutNftCard') {
      const nftCardInfo = await uploadNFTCardW3GatewayPromise(authHeader);
      pinW3Crust(authHeader, nftCardInfo.cid, 'nftcard');
    }

    const metadataInfo = await uploadMetadataW3GatewayPromise(authHeader);
    pinW3Crust(authHeader, metadataInfo.cid, 'metadata');
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

        setMetadataUploading(true);

        if (nftType !== 'withoutNftCard') {
          const nftCardInfo = await uploadNFTCardW3GatewayPromise(authHeader);
          pinW3Crust(authHeader, nftCardInfo.cid, 'nftcard');
        }

        const metadataInfo = await uploadMetadataW3GatewayPromise(authHeader);
        pinW3Crust(authHeader, metadataInfo.cid, 'metadata');
      } else {
        onSnackbarAction(
          'warning',
          'Please select Polygon Network from Metamask',
          null,
          'LEARN MORE',
          METAMASK_SELECT_POLYGON_URL
        );
      }
    } else {
      onSnackbarAction(
        'warning',
        'Please install Metamask',
        null,
        'LEARN MORE',
        INSTALL_METAMASK_URL
      );
    }
  };

  return (
    <>
      <Grid container sx={{ pt: 5 }}>
        <Grid item xs={12} sx={{ pb: 5 }}>
          <Stack alignItems="center" justifyContent="center">
            <Box sx={{ borderRadius: 2 }} component="img" src={srcImage} height={300} />
          </Stack>
        </Grid>
        {nftType === 'simplified' ? (
          <Grid container item xs={12}>
            <Grid container item>
              <Grid
                item
                xs={12}
                md={12}
                lg={7}
                sx={{
                  pb: { xs: 5, md: 0 },
                  maxHeight: { xs: 'auto', lg: '500vh' }
                }}
              >
                <SliderSVGCard />
              </Grid>
              <Grid container item xs={12} md={12} lg={5} sx={{ ml: { xs: 5, md: 5, lg: 0 } }}>
                <Grid container item>
                  <Grid item xs={12}>
                    <TitleAndDescription />
                  </Grid>
                  <Grid item xs={12} sx={{ pb: 0 }}>
                    <MetadataSummary>
                      <CustomProps />
                    </MetadataSummary>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TitleAndDescription />
          </Grid>
        )}
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
            <Scrollbar sxRoot={{ maxWidth: '111px' }}>
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
                {/* <ToggleButton value="solana" sx={{ minWidth: '56px' }} disabled>
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
                </ToggleButton> */}
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
              <Typography variant="subtitle2">
                Metadata is uploaded successfully to Crust Network
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                CID: {metadataCid}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
      {nftCardCid !== '' && (
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
              <Typography variant="subtitle2">
                NFT Card is uploaded successfully to Crust Network
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                CID: {nftCardCid}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default StepCustomizeNFTCard;
