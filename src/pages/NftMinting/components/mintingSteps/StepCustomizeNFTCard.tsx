import { useEffect, useRef, useState } from 'react';
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
  Zoom,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Label from 'components/Label';
import MetadataSummary from '../MetadataSummary';
import Scrollbar from 'components/Scrollbar';
import { Icon } from '@iconify/react';
import { create } from 'ipfs-http-client';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useForm, Controller, Control, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { W3_GATEWAYS } from '../../../../constants/W3_GATEWAYS';
import {
  IPFS_GATEWAY_W3AUTH,
  CRUST_WALLET_WIKI,
  METAMASK_SELECT_POLYGON_URL,
  INSTALL_METAMASK_URL
} from '../../../../constants/COMMON_VARIABLES';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { ethers } from 'ethers';
import { stringToHex } from '@polkadot/util';
import { pinW3Crust } from './StepUploadFile';
import detectEthereumProvider from '@metamask/detect-provider';
import qrStyles from '../qrCardCustomize';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { changeQRCardGeneralInfo, qrStyleNameType } from '../../../../redux/reducerCustomizeQRCard';
import { changeMintingProcessState } from '../../../../redux/reducerMintingProcess';
import SliderSVGCard from '../NftCardsDesign';
import domtoimage from 'dom-to-image';
import useSnackbarAction from 'hooks/useSnackbarAction';
import useLocales from '../../../../hooks/useLocales';

// const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];

type StepCustomizeNFTCardProps = {
  handleAlignment: (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => void;
};

const defaultValues = {
  title: ''
};
type FormValuesProps = {
  title: string;
};

function TitleAndDescription({ control }: { control: Control<FormValuesProps, object> }) {
  const { stepTwoNotDone, descNft } = useAppSelector((state) => ({
    stepTwoNotDone: state.reducerMintingProcess.stepTwoNotDone,
    descNft: state.reducerMintingProcess.descNft
  }));
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const handleDescNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMintingProcessState({ descNft: event.target.value }));
  };

  return (
    <>
      <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase' }}>
        {translate(`nftMinting.metadata`)}
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
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            variant="standard"
            multiline
            error={Boolean(error)}
            helperText={error?.message}
            disabled={!stepTwoNotDone}
          />
        )}
      />

      <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {translate(`nftMinting.description`)}
        </Typography>
      </Box>

      <TextField
        rows={3}
        fullWidth
        variant="standard"
        multiline
        size="small"
        placeholder={translate(`nftMinting.placeholder`)}
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

  const { translate } = useLocales();
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
    qrStyleName,
    qrStyleNameAuthorRegister,
    changeQRFile,
    ipfsGateway
  } = useAppSelector((state) => ({
    nftType: state.reducerMintingProcess.nftType,
    stepTwoNotDone: state.reducerMintingProcess.stepTwoNotDone,
    nameNft: state.reducerMintingProcess.nameNft,
    descNft: state.reducerMintingProcess.descNft,
    alignment: state.reducerMintingProcess.alignment,
    uploadedCid: state.reducerMintingProcess.uploadedCid,
    metadataCid: state.reducerMintingProcess.metadataCid,
    nftCardCid: state.reducerMintingProcess.nftCardCid,
    srcImage: state.reducerMintingProcess.srcImage,
    qrStyleName: state.reducerCustomizeQRCard.qrStyleName,
    qrStyleNameAuthorRegister: state.reducerCustomizeQRCard.qrStyleNameAuthorRegister,
    changeQRFile: state.reducerCustomizeQRCard.changeQRFile,
    ipfsGateway: state.reducerMintingProcess.ipfsGateway
  }));

  const dispatch = useAppDispatch();

  const { CustomProps } = changeQRFile
    ? qrStyles[qrStyleName as qrStyleNameType]
    : qrStyles[qrStyleNameAuthorRegister as qrStyleNameType];

  function uploadNFTCardW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const nftCard = document.getElementById('nftCard') as HTMLElement;
      let scale = 4;
      domtoimage
        .toBlob(nftCard, {
          width: nftCard.offsetWidth * scale,
          height: nftCard.offsetHeight * scale,
          style: {
            transform: `scale(${scale}) translate(${
              ((scale - 1) * nftCard.offsetWidth) / 2 / scale
            }px, ${((scale - 1) * nftCard.offsetHeight) / 2 / scale}px)`
          }
        })
        .then(function (blob: Blob) {
          const ipfs = create({
            url: ipfsGateway + '/api/v0',
            headers: {
              authorization: 'Basic ' + authHeader
            }
          });
          ipfs.add(blob).then((added) => {
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
    setMetadataUploading(true);
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
        setMetadataUploading(true);
        await provider.request({ method: 'eth_requestAccounts' });

        const providerEthers = new ethers.providers.Web3Provider(provider);

        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const signature = await signer.signMessage(addr);

        const authHeader = Buffer.from(`pol-${addr}:${signature}`).toString('base64');

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

  const parentBoundingBox = useRef() as React.MutableRefObject<HTMLDivElement>;
  const scrollDestination = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (nftType === 'simplified' || nftType === 'withAuthorReg') {
      if (window.innerWidth > 1200) {
        window.scrollTo({
          top: scrollDestination.current.offsetTop + 200,
          behavior: 'smooth'
        });
        parentBoundingBox.current.style.height = 'auto';
        setTimeout(() => {
          parentBoundingBox.current.style.height = `${parentBoundingBox.current.offsetHeight}px`;
        }, 1000);
      } else {
        parentBoundingBox.current.style.height = 'auto';
      }
    }
  }, [qrStyleName, qrStyleNameAuthorRegister, changeQRFile, nftType]);

  const FormSchema = Yup.object().shape({
    title: Yup.string().required('The title is required')
  });

  const { control, watch, handleSubmit } = useForm<FormValuesProps>({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues
  });

  const watchTitle = watch('title');

  useEffect(() => {
    dispatch(changeMintingProcessState({ nameNft: watchTitle }));
    dispatch(
      changeQRCardGeneralInfo({
        title: watchTitle
      })
    );
  }, [watchTitle]);

  const handleSubmitError = (errors: FieldErrors<FormValuesProps>) => {
    onSnackbarAction('error', errors.title?.message || '', 3000);
  };

  const handleSelectGateway = (event: SelectChangeEvent) => {
    dispatch(changeMintingProcessState({ ipfsGateway: event.target.value }));
    // setFileUploading(false);
    setMetadataUploading(false);
  };

  return (
    <>
      <Grid container sx={{ pt: 5 }}>
        <Grid item xs={12} sx={{ pb: 5 }}>
          <Stack alignItems="center" justifyContent="center">
            <Box
              ref={scrollDestination}
              sx={{ borderRadius: 2 }}
              component="img"
              src={srcImage}
              height={300}
            />
          </Stack>
        </Grid>
        {nftType === 'simplified' || nftType === 'withAuthorReg' ? (
          <Grid container item xs={12}>
            <Grid container item>
              <Grid
                ref={parentBoundingBox}
                item
                xs={12}
                md={12}
                lg={7}
                sx={{
                  pb: { xs: 5, md: 0 }
                }}
              >
                <SliderSVGCard parentBoundingBox={parentBoundingBox} />
              </Grid>
              <Grid container item xs={12} md={12} lg={5} sx={{ ml: { xs: 5, md: 5, lg: 0 } }}>
                <Grid container item>
                  <Grid item xs={12}>
                    <TitleAndDescription control={control} />
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
            <TitleAndDescription control={control} />
          </Grid>
        )}
      </Grid>

      <Box sx={{ pt: 4 }}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="ipfsGatewayLabel">Gateway</InputLabel>
          <Select
            labelId="ipfsGateway"
            id="demo-simple-select-helper"
            value={ipfsGateway}
            label="Gateway"
            onChange={handleSelectGateway}
          >
            {W3_GATEWAYS.map((gateway) => (
              <MenuItem key={gateway.value} value={gateway.value}>
                {`${gateway.text} - ${gateway.location}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
            <Typography variant="h6">{translate(`nftMinting.upload`)}</Typography>
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
                  onClick={handleSubmit(uploadMetadataCrust, handleSubmitError)}
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
                  onClick={handleSubmit(uploadMetadataMetamask, handleSubmitError)}
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
              <Typography variant="subtitle2">{translate(`nftMinting.updated`)}</Typography>
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
              <Typography variant="subtitle2">{translate(`nftMinting.uploaded`)}</Typography>
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
