import React, { useState, useEffect } from 'react';
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
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { Icon } from '@iconify/react';

import { ABI } from '../../../utils/abi';
import { contractAddress } from '../../../utils/contractAddress';
import { IPFS_GATEWAY_W3AUTH } from '../../../assets/COMMON_VARIABLES';
import UploadFileStep, { FileInfoType } from './mintingSteps/StepUploadFile';
import StepCustomizeNFTCard from './mintingSteps/StepCustomizeNFTCard';
import { MintingContext, MintingContextInterface } from './minting.context';

// ----------------------------------------------------------------------
const steps = ['Upload File', 'Customize NFT Card', 'Mint NFT'];

type MintingProcessProps = {
  nftType: string;
};

export default function MintingProcess({ nftType }: MintingProcessProps) {
  const [stepOneNotDone, setStepOneNotDone] = useState(false);
  const [stepTwoNotDone, setStepTwoNotDone] = useState(true);
  const [uploadedCid, setUploadedCid] = useState<FileInfoType>({ cid: '', name: '', size: 0 });
  const [metadataCid, setMetadataCid] = useState('');
  const [nameNft, setNameNft] = useState('');
  const [descNft, setDescNft] = useState('');
  const [alignment, setAlignment] = useState<string | null>('crust');
  const [srcImage, setSrcImage] = useState('');
  const initMintingContext: MintingContextInterface = {
    stepOneNotDone,
    setStepOneNotDone,
    stepTwoNotDone,
    setStepTwoNotDone,
    nameNft,
    setNameNft,
    descNft,
    setDescNft,
    alignment,
    setAlignment,
    uploadedCid,
    setUploadedCid,
    metadataCid,
    setMetadataCid,
    srcImage,
    setSrcImage
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
  const [files, setFiles] = useState<File[]>([]);

  const isStepOptional = (step: number) => false;

  const isStepSkipped = (step: number) => skipped.has(step);

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

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
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

  const [transactionHash, setTransactionHash] = useState('');
  const [isMinting, setMinting] = useState(false);
  const [nftMinted, setNftMinted] = useState(false);
  const [tokenID, setTokenID] = useState(0);

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
    <MintingContext.Provider value={initMintingContext}>
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
          <UploadFileStep onSnackbarAction={onSnackbarAction} />
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
          <StepCustomizeNFTCard
            onSnackbarAction={onSnackbarAction}
            handleAlignment={handleAlignment}
          />
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
    </MintingContext.Provider>
  );
}
