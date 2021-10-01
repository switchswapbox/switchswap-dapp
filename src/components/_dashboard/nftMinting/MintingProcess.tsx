import { useState, useCallback } from 'react';
// material
import {
  Box,
  Card,
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
  Switch,
  Stepper,
  StepLabel,
  CardContent,
  Typography,
  CardHeader,
  LinearProgress,
  FormControlLabel
} from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import Scrollbar from '../../Scrollbar';
import UploadMultiFile from './UploadMultiFile';
import UploadSingleFile from './UploadSingleFile';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { stringToHex } from '@polkadot/util';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { create } from 'ipfs-http-client';
import axios from 'axios';
import { Icon } from '@iconify/react';

import { IPFS_GATEWAY_W3AUTH, IPFS_PINNING_SERVICE_W3AUTH } from '../../../assets/COMMON_VARIABLES';
import { lte } from 'lodash';
const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];
const ipfsPinningService = IPFS_PINNING_SERVICE_W3AUTH[0];
// ----------------------------------------------------------------------
const steps = ['Upload File', 'Customize NFT Card', 'Upload Meta', 'Mint NFT'];

type MintingProcessProps = {
  nftType: string;
};

export default function MintingProcess({ nftType }: MintingProcessProps) {
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
  const [stepOneNotDone, setStepOneNotDone] = useState(true);
  const [uploadedCid, setUploadedCid] = useState('');
  const [isFileUploading, setFileUploading] = useState(false);
  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles.map((file: File) => file));
    },
    [setFiles]
  );

  const uploadFileW3Gateway = (authHeader: string) => {
    setFileUploading(true);
    const ipfs = create({
      url: ipfsGateway + '/api/v0',
      headers: {
        authorization: 'Basic ' + authHeader
      }
    });
    const reader = new FileReader();
    reader.onload = async () => {
      const added = await ipfs.add(reader.result as ArrayBuffer);
      setUploadedCid(added.cid.toV0().toString());
      setStepOneNotDone(false);
    };
    reader.readAsArrayBuffer(files[0]);
  };

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
        setUploadedCid(added.cid.toV0().toString());
        setFileUploading(false);
        setStepOneNotDone(false);
        resolve({ cid: added.cid.toV0().toString(), name: files[0].name });
      };
      reader.readAsArrayBuffer(files[0]);
    });
  }

  const pinFileW3Crust = async (authHeader: string, cid: string, name: string) => {
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
    console.log(result);
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
            pinFileW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const uploadFileCrust = async () => {
    console.log('helllo');
    const extensions = await web3Enable('NFT Dapp');
    if (extensions.length === 0) {
      return;
    }
    const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();

    let crustAccountIndex = parseInt(localStorage.getItem('selectedAccountCrustIndex') || '0', 10);

    crustAccountIndex =
      crustAccountIndex < allAccounts.length && crustAccountIndex >= 0 ? crustAccountIndex : 0;

    const account = allAccounts[crustAccountIndex];

    const injector = await web3FromSource(account.meta.source);

    const signRaw = injector?.signer?.signRaw;

    // console.log(account.address);
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
        pinFileW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

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
      {activeStep === 0 && nftType === 'withoutNftCard' ? (
        <>
          <Box sx={{ display: 'flex', mt: 3 }}>
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
          />

          {uploadedCid !== '' && (
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
                  <Typography variant="body2">CID: {uploadedCid}</Typography>
                </Stack>
              </Stack>
            </Box>
          )}
          {/* <UploadSingleFile file={file} onDrop={handleDropSingleFile} /> */}
          <Box sx={{ display: 'flex', mt: 1 }}>
            {/* <Button onClick={uploadSingleFile}>Test Upfile </Button> */}
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={handleNext}>
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
      {activeStep === 1 ? (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120 }}>
            <Stack spacing={3}>
              <TextField fullWidth placeholder="My NFT Name" label="Name" />
              <TextField rows={4} fullWidth multiline label="Description" defaultValue="" />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Grid
              container
              sx={{
                my: 1,
                // borderRadius: 1,
                // border: (theme) => `solid 1px ${theme.palette.divider}`,
                bgcolor: 'background.paper'
              }}
            >
              <Grid item xs={12} md={3}>
                <Stack direction="row" sx={{ p: 2 }} alignItems="center" spacing={2}>
                  <Typography variant="h6">Upload file</Typography>
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
                  sx={{ p: 1, width: '100%' }}
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Scrollbar>
                    <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                      <ToggleButton value="crust" sx={{ minWidth: '56px' }}>
                        <Box
                          component="img"
                          src="./static/icons/shared/crust.svg"
                          sx={{ height: '24px', width: '32px' }}
                        />
                      </ToggleButton>
                      <ToggleButton value="polygon" sx={{ minWidth: '56px' }}>
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
            <Divider sx={{ my: 2 }} />
          </Paper>
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
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      {activeStep === 2 ? (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography>
          </Paper>
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
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      {activeStep === 3 ? (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography>
          </Paper>
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
            <Button variant="contained" onClick={handleNext}>
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
