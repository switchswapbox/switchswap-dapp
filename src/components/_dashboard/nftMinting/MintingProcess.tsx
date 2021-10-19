import React, { useState } from 'react';
// material
import {
  Box,
  Step,
  Paper,
  Button,
  IconButton,
  Stepper,
  StepLabel,
  Typography
} from '@mui/material';

import { useSnackbar, VariantType } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';

import Scrollbar from '../../Scrollbar';
import { Icon } from '@iconify/react';

import UploadFileStep from './mintingSteps/StepUploadFile';
import StepCustomizeNFTCard from './mintingSteps/StepCustomizeNFTCard';
import StepMintNFT from './mintingSteps/StepMintNFT';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMintingProcessState,
  MintingProcessStateAlignement
} from 'reduxStore/reducerMintingProcess';
import { IRootState } from 'reduxStore';

import StepConfigureNFT from './mintingSteps/StepConfigureNFT';
// ----------------------------------------------------------------------
const steps = ['NFT Configuration', 'Upload File', 'Customize NFT Card', 'Mint NFT'];

export default function MintingProcess() {
  const { stepOneNotDone, stepTwoNotDone } = useSelector((state: IRootState) => {
    return {
      stepOneNotDone: state.reducerMintingProcess.stepOneNotDone,
      stepTwoNotDone: state.reducerMintingProcess.stepTwoNotDone
    };
  });

  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const isStepOptional = (step: number) => false;
  const isStepSkipped = (step: number) => skipped.has(step);

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
    dispatch(
      changeMintingProcessState({
        alignment: newAlignment as MintingProcessStateAlignement
      })
    );
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
      {activeStep === 0 ? (
        <>
          <StepConfigureNFT />
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
      ) : (
        <></>
      )}

      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      Step 1
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {activeStep === 1 ? (
        <>
          <UploadFileStep onSnackbarAction={onSnackbarAction} />
          <Box sx={{ display: 'flex', mt: 3 }}>
            {/* <Button onClick={uploadSingleFile}>Test Upfile </Button> */}
            <Button color="inherit" disabled={activeStep === 1} onClick={handleBack}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={handleNext} disabled={stepOneNotDone}>
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
      Step 3
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {activeStep === 3 ? (
        <>
          <StepMintNFT handleAlignment={handleAlignment} />
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
