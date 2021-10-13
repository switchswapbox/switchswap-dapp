import React, { useState, useCallback, useEffect } from 'react';
// material
import {
  Box,
  Step,
  Divider,
  Paper,
  Zoom,
  SvgIcon,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Grid,
  IconButton,
  Stepper,
  StepLabel,
  Typography,
  LinearProgress,
  Alert
} from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Label from '../../Label';
import { useSnackbar, VariantType } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';

import Scrollbar from '../../Scrollbar';
import UploadMultiFile from './UploadMultiFile';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { stringToHex } from '@polkadot/util';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { create } from 'ipfs-http-client';
import axios from 'axios';
import { Icon } from '@iconify/react';

import { ABI } from '../../../utils/abi';
import { contractAddress } from '../../../utils/contractAddress';
import {
  IPFS_GATEWAY_W3AUTH,
  IPFS_PINNING_SERVICE_W3AUTH,
  CRUST_WALLET_WIKI,
  METAMASK_SELECT_POLYGON_URL,
  INSTALL_METAMASK_URL
} from '../../../assets/COMMON_VARIABLES';
import NftCardsCarousel from './NftCardsCarousel';
import MetadataSummary from './MetadataSummary';
import svg1 from '../../../utils/svg-data/svg1';
import svg2 from '../../../utils/svg-data/svg2';
import svg3 from '../../../utils/svg-data/svg3';
import svg4 from '../../../utils/svg-data/svg4';
const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];
const ipfsPinningService = IPFS_PINNING_SERVICE_W3AUTH[0];
// ----------------------------------------------------------------------
const steps = ['Upload File', 'Customize NFT Card', 'Mint NFT'];

type MintingProcessProps = {
  nftType: string;
};

type FileInfoType = {
  name: string;
  cid: string;
  size: number;
};

type nftCardsType = {
  svg1: any;
  svg2: any;
  svg3: any;
  svg4: any;
};

const nftCards: nftCardsType = {
  svg1: svg1,
  svg2: svg2,
  svg3: svg3,
  svg4: svg4
};

export default function MintingProcess({ nftType }: MintingProcessProps) {
  const [nameNft, setNameNft] = useState('');
  const [descNft, setDescNft] = useState('');

  const handleNameNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameNft(event.target.value);
  };

  const handleDescNftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescNft(event.target.value);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSnackbarAction = (color: VariantType, text: string, url?: string) => {
    enqueueSnackbar(text, {
      variant: color,
      action: (key) => (
        <>
          {url && (
            <Button
              size="small"
              color={color !== 'default' ? color : 'primary'}
              href={url}
              target="_blank"
            >
              Learn
            </Button>
          )}
          <IconButton size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} width={24} height={24} />
          </IconButton>
        </>
      )
    });
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [preview, setPreview] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const isStepOptional = (step: number) => false;

  const isStepSkipped = (step: number) => skipped.has(step);

  const [alignment, setAlignment] = useState<string | null>('crust');
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [file, setFile] = useState<File>();
  const [stepOneNotDone, setStepOneNotDone] = useState(false);
  const [stepTwoNotDone, setStepTwoNotDone] = useState(true);
  const [uploadedCid, setUploadedCid] = useState<FileInfoType>({ cid: '', name: '', size: 0 });
  const [metadataCid, setMetadataCid] = useState('');

  const [isFileUploading, setFileUploading] = useState(false);
  const [isMetadataUploading, setMetadataUploading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [isMinting, setMinting] = useState(false);
  const [nftMinted, setNftMinted] = useState(false);
  const [tokenID, setTokenID] = useState(0);

  const [srcImage, setSrcImage] = useState('');

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles.map((file: File) => file));
    },
    [setFiles]
  );

  const loadImg = () => {
    const reader = new FileReader();

    reader.onload = async () => {
      setSrcImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  useEffect(() => {
    if (files[0]) {
      loadImg();
    }
  }, [files[0]]);

  function uploadFileW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setFileUploading(true);
      const ipfs = create({
        url: ipfsGateway + '/api/v0',
        headers: {
          authorization: 'Basic ' + authHeader
        }
      });
      const reader = new FileReader();
      reader.onabort = () => reject('file reading was aborted');
      reader.onerror = () => reject('file reading has failed');
      reader.onload = async () => {
        const added = await ipfs.add(reader.result as ArrayBuffer);
        setUploadedCid({ cid: added.cid.toV0().toString(), size: added.size, name: files[0].name });
        setFileUploading(false);
        setStepOneNotDone(false);
        resolve({ cid: added.cid.toV0().toString(), name: files[0].name });
      };
      reader.readAsArrayBuffer(files[0]);
    });
  }

  const pinW3Crust = async (authHeader: string, cid: string, name: string) => {
    const result = await axios.post(
      ipfsPinningService + '/pins',
      {
        cid,
        name
      },
      {
        headers: {
          authorization: 'Bearer ' + authHeader,
          'Content-Type': 'application/json'
        }
      }
    );
  };

  const uploadFileMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });

        const providerEthers = new ethers.providers.Web3Provider(provider);

        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const signature = await signer.signMessage(addr);

        const authHeader = Buffer.from(`pol-${addr}:${signature}`).toString('base64');

        uploadFileW3GatewayPromise(authHeader)
          .then((uploadedFileInfo) => {
            pinW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
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

  const uploadMetadataMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });

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

  const uploadFileCrust = async () => {
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

    uploadFileW3GatewayPromise(authHeader)
      .then((uploadedFileInfo) => {
        pinW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleRemove = (file: File | string) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  async function mintDataNTF() {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        setMinting(true);
        const providerEthers = new ethers.providers.Web3Provider(provider);
        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, ABI, providerEthers);
        const signedContract = contract.connect(signer);
        signedContract
          .mintDataNTF(addr, `ipfs://${metadataCid}`, `ipfs://${uploadedCid.cid}`, 'null')
          .then((tx: any) => {
            setTransactionHash(tx.hash);
            providerEthers.waitForTransaction(tx.hash).then(() => {
              setMinting(false);
              setNftMinted(true);
              providerEthers.getTransactionReceipt(tx.hash).then((receipt: any) => {
                setTokenID(parseInt(receipt.logs[0].topics[3], 16));
              });
            });
          })
          .catch((error: any) => {
            console.log(error);
            setMinting(false);
          });
      }
    }
  }

  return (
    <>
      <Scrollbar>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Scrollbar>

      {activeStep === steps.length ? (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      Step 0
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {activeStep === 0 && nftType === 'withoutNftCard' ? (
        <>
          <Box sx={{ display: 'flex', mt: 3, mb: 1 }}>
            <Typography variant="h6">Upload file to Crust Network</Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />
              }
              label="Show Preview"
            /> */}
          </Box>
          <UploadMultiFile
            showPreview={preview}
            files={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemove}
            onUploadFile={{ uploadFileMetamask, uploadFileCrust }}
            isFileUploading={isFileUploading}
            stepOneNotDone={stepOneNotDone}
          />

          {uploadedCid.cid !== '' && (
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
                    Uploaded successfully to Crust Network
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    CID: {uploadedCid.cid}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}
          {/* <UploadSingleFile file={file} onDrop={handleDropSingleFile} /> */}
          <Box sx={{ display: 'flex', mt: 3 }}>
            {/* <Button onClick={uploadSingleFile}>Test Upfile </Button> */}
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={handleNext} disabled={stepOneNotDone}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) : activeStep === 0 ? (
        <>
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Typography variant="h6">
              We currently support creating NFT without customized NFT card, you can try on that and
              stay tune for other NFT types
            </Typography>
          </Box>
        </>
      ) : (
        <></>
      )}

      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      Step 1
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {activeStep === 1 ? (
        <>
          <>
            <Grid container spacing={3} sx={{ pt: 5 }}>
              <Grid item xs={12} md={6} lg={7}>
                <NftCardsCarousel nftCards={nftCards} />
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <MetadataSummary product={null} />
              </Grid>
            </Grid>
          </>
          <Grid container spacing={3} sx={{ pt: 5 }}>
            <Grid item xs={12} md={6} lg={7}>
              <Stack alignItems="center" justifyContent="center">
                <Box sx={{ borderRadius: 2 }} component="img" src={srcImage} />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Label variant="ghost" color="warning" sx={{ textTransform: 'uppercase' }}>
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
                  <Typography variant="subtitle2">
                    Uploaded successfully to Crust Network
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    CID: {metadataCid}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}

          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button variant="contained" onClick={handleNext} disabled={stepTwoNotDone}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}

      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      Step 2
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {activeStep === 2 ? (
        <>
          <Grid container spacing={3} sx={{ pt: 5 }}>
            <Grid item xs={12} md={6} lg={7}>
              {/* <ProductDetailsCarousel product={product} /> */}
              <Stack alignItems="center" justifyContent="center">
                <Box sx={{ borderRadius: 2 }} component="img" src={srcImage} />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase' }}>
                Minting NFT
              </Label>
              <Typography
                variant="h5"
                paragraph
                sx={{
                  mt: 2,
                  mb: 0
                }}
              >
                {nameNft}
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {descNft}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {isMinting ? <LinearProgress color="info" sx={{ my: 3 }} /> : <Divider sx={{ my: 3 }} />}
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
                <Typography variant="h6">Mint NFT</Typography>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="You must have a small amount of token in your wallet"
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
                <Button
                  size="large"
                  type="button"
                  color="warning"
                  variant="contained"
                  onClick={mintDataNTF}
                  startIcon={
                    <Box
                      component="img"
                      src="./static/icons/shared/polygon.svg"
                      sx={{ height: '24px', width: '32px' }}
                    />
                  }
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Mint NFT
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: 3, display: transactionHash !== '' ? 'flex' : 'none' }}>
            <Alert
              icon={false}
              severity={nftMinted ? 'success' : 'info'}
              sx={{
                width: '100%',
                wordBreak: 'break-word'
              }}
            >
              {nftMinted
                ? `Your NFT is minted with transaction hash: ${transactionHash} `
                : `Your request of minting NFT is in progress with transaction hash: ${transactionHash} `}
              <SvgIcon>
                <Icon icon="fxemoji:rocket" />
              </SvgIcon>
            </Alert>
          </Grid>

          {isMinting ? (
            <LinearProgress variant="query" color="info" sx={{ my: 3 }} />
          ) : (
            <Divider sx={{ my: 3 }} />
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: 'center' }}
            sx={{ pb: 3, width: '100%', display: transactionHash === '' ? 'none' : 'flex' }}
          >
            <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
              <ToggleButton
                value="etherscan"
                sx={{ minWidth: '56px', display: transactionHash === '' ? 'none' : 'flex' }}
                href={transactionHash !== '' ? `https://polygonscan.com/tx/${transactionHash}` : ''}
                target="_blank"
              >
                <Box
                  component="img"
                  src="./static/icons/shared/polygon-white.svg"
                  sx={{ height: '24px', width: '32px' }}
                />
              </ToggleButton>
              <ToggleButton
                value="opensea"
                sx={{ minWidth: '56px', display: tokenID === 0 ? 'none' : 'flex' }}
                href={
                  tokenID !== 0
                    ? `https://opensea.io/assets/matic/${contractAddress}/${tokenID}`
                    : ''
                }
                target="_blank"
              >
                <Box
                  component="img"
                  src="./static/icons/shared/opensea.svg"
                  sx={{ height: '24px', width: '32px' }}
                />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ display: activeStep === steps.length - 1 ? 'none' : 'flex' }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
