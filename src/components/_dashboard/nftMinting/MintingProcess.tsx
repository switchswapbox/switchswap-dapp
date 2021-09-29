import { useState, useCallback } from 'react';
// material
import {
  Box,
  Card,
  Step,
  Paper,
  Button,
  Switch,
  Stepper,
  StepLabel,
  CardContent,
  Typography,
  CardHeader,
  FormControlLabel
} from '@mui/material';

import Scrollbar from '../../Scrollbar';
import UploadMultiFile from './UploadMultiFile';
import UploadSingleFile from './UploadSingleFile';

import { create } from 'ipfs-http-client';
import axios from 'axios';

const ipfsGateway = 'https://crustwebsites.net';
const authHeader = Buffer.from(
  // `pol-0x272a8f05d05d69b6d8261538b031ffac60ba0c8c:0xd25e6494e0ad7988815f07670d1a0133150b039a5a796efea50f72cde520731354fbf4fac099e81a346abf76d7d8f0fb7cabbfa3a17d5d2829d1a85aa607884e1c`
  //  `sub-5EoX3ZVUSKbQHqkuvCWvintEnqeAXWdiMer6yP23EE9oajt5:0xe8a9fe4209d477cadfdba2ce5a4446c49589b39154a643fc9bfc6b55d35cdd15be8cf6d23ea84d441dd1226e2f05158a6f24a6a30cf051cab2d40788a6e89e0f`
  //`pol-0x5a292ff2e5E4caA4A441c8DB3f7cE065Ad4753Bf:0xbd501da9f65de162ec010b57ca2bb7f6e17340911b320f3ebc8141fb0ea854c72e08f789c2efc07999d2e0f1c366b3ef72e7751644d87556306551b7f8b7983e1c`
  //`pol-0x6d26C405BB919643AfA2c89e8A138d2015b3A62F:0x4eca77e960755e7eeb191073bfc46b05f3145c479279346322cf6f945dfb8af03f5a63237cc2d611b1381bbea8857b3e2bb44cea8cefd26f38a004fd7e9225a61b`
  `pol-0x5a292ff2e5E4caA4A441c8DB3f7cE065Ad4753Bf:0xbd501da9f65de162ec010b57ca2bb7f6e17340911b320f3ebc8141fb0ea854c72e08f789c2efc07999d2e0f1c366b3ef72e7751644d87556306551b7f8b7983e1c`
).toString('base64');

const ipfs = create({
  url: ipfsGateway + '/api/v0',
  headers: {
    authorization: 'Basic ' + authHeader
  }
});
// ----------------------------------------------------------------------

const steps = ['Upload File', 'Customize NFT Card', 'Upload Meta', 'Mint NFT'];

export default function MintingProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [preview, setPreview] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const isStepOptional = (step: number) => step === 1;

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

  // const handleDropSingleFile = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   if (file) {
  //     setFile({
  //       ...file,
  //       preview: URL.createObjectURL(file)
  //     });
  //   }
  // }, []);

  // const uploadSingleFile = async () => {
  //   try {
  //     console.log(file);
  //     // console.log(files[0]);
  //     console.log('up file');
  //     // const file = files[0];
  //     const added = await ipfs.add(file);
  //     console.log('added');
  //     console.log(added);

  //     // console.log(`cid v0 ${added.cid.toV0().toString()}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const handleDropMultiFile = useCallback(
  //   (acceptedFiles) => {
  //     setFiles(
  //       acceptedFiles.map((file: File) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file)
  //         })
  //       )
  //     );
  //   },
  //   [setFiles]
  // );

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      setFiles(acceptedFiles.map((file: File) => file));
    },
    [setFiles]
  );

  // const handleRemoveAll = () => {
  //   setFiles([]);
  // };
  const uploadFile = async () => {
    try {
      // console.log(files);
      console.log(files[0]);
      console.log('up file');
      const file = files[0];
      const added = await ipfs.add(file);
      console.log('added');
      console.log(added);

      console.log(`cid v0 ${added.cid.toV0().toString()}`);
    } catch (e) {
      console.log(e);
    }
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
      {activeStep === 0 ? (
        <>
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Typography variant="h6">Upload file to Crust Network</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />
              }
              label="Show Preview"
            />
          </Box>
          <UploadMultiFile
            showPreview={preview}
            files={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemove}
            onUploadFile={uploadFile}
          />
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
      ) : (
        <></>
      )}
      {activeStep === 1 ? (
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
