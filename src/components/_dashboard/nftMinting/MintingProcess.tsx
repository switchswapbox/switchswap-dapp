import React, { useCallback, useState } from 'react';
// material
import { Box, Step, Paper, Button, Stepper, Popover, StepLabel, Typography } from '@mui/material';

import Scrollbar from '../../Scrollbar';

import UploadFileStep from './mintingSteps/StepUploadFile';
import StepCustomizeNFTCard from './mintingSteps/StepCustomizeNFTCard';
import StepMintNFT from './mintingSteps/StepMintNFT';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMintingProcessState,
  MintingProcessStateAlignement,
  resetMintingProcessState
} from 'reduxStore/reducerMintingProcess';
import { IRootState } from 'reduxStore';
import StepConfigureNFT from './mintingSteps/StepConfigureNFT';
import useLocales from '../../../hooks/useLocales';
import { resetQRCardInfo } from 'reduxStore/reducerCustomizeQRCard';
import domtoimage from 'dom-to-image';
// ----------------------------------------------------------------------
const steps = ['NFT Configuration', 'Upload File', 'Customize NFT Card', 'Mint NFT'];

export default function MintingProcess() {
  const { activeStep, stepOneNotDone, stepTwoNotDone, nftMinted, nftType, title } = useSelector(
    (state: IRootState) => {
      return {
        activeStep: state.reducerMintingProcess.activeStep || 0,
        stepOneNotDone: state.reducerMintingProcess.stepOneNotDone,
        stepTwoNotDone: state.reducerMintingProcess.stepTwoNotDone,
        nftMinted: state.reducerMintingProcess.nftMinted,
        nftType: state.reducerMintingProcess.nftType,
        title: state.reducerCustomizeQRCard.title,
        link: state.reducerMintingProcess.link
      };
    }
  );

  const dispatch = useDispatch();
  const [skipped, setSkipped] = useState(new Set<number>());
  const isStepOptional = (step: number) => false;
  const isStepSkipped = (step: number) => skipped.has(step);
  const { translate } = useLocales();
  const finish = translate(`mintingProcess.finish`);
  const next = translate(`mintingProcess.next`);
  const [click, setCLick] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCLick(event.currentTarget);
  };
  const handleClose = () => {
    setCLick(null);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    dispatch(changeMintingProcessState({ activeStep: activeStep + 1 }));
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    dispatch(changeMintingProcessState({ activeStep: activeStep - 1 }));
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

    dispatch(changeMintingProcessState({ activeStep: activeStep + 1 }));
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    dispatch(resetMintingProcessState());
    dispatch(resetQRCardInfo());
  };

  const handleDownload = () => {
    let nftCard = document.getElementById('nftCard') as HTMLElement;
    domtoimage
      .toPng(nftCard)
      .then(function (dataUrl) {
        downloadCard(dataUrl, title === '' ? 'image.png' : `${title}.png`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadCard = useCallback((href: string, name: string) => {
    var link = document.createElement('a');
    link.download = name;
    document.body.append(link);
    link.href = href;
    link.click();
  }, []);

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
                <StepLabel {...labelProps}>{translate(`mintingProcess.${label}`)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Scrollbar>

      {activeStep === steps.length ? (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}>{translate(`mintingProcess.step completed`)}</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>{translate(`mintingProcess.reset`)}</Button>
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
              {translate(`mintingProcess.back`)}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={nftType === '' ? handleClick : handleNext}>
              {activeStep === steps.length - 1 ? finish : next}
            </Button>
            <Popover
              open={Boolean(click)}
              anchorEl={click}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <Box sx={{ p: 2, maxWidth: 280 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Please select an NFT type according to your need. Choose{' '}
                  <Typography variant="subtitle2">Without NFT Card</Typography> if you just want to
                  play around
                </Typography>
              </Box>
            </Popover>
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
          <UploadFileStep />
          <Box sx={{ display: 'flex', mt: 3 }}>
            {/* <Button onClick={uploadSingleFile}>Test Upfile </Button> */}
            <Button color="inherit" onClick={handleBack}>
              {translate(`mintingProcess.back`)}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={handleNext} disabled={stepOneNotDone}>
              {activeStep === steps.length - 1 ? finish : next}
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
          <StepCustomizeNFTCard handleAlignment={handleAlignment} />
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              {translate(`mintingProcess.back`)}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                {translate(`mintingProcess.skip`)}
              </Button>
            )}
            <Button variant="contained" onClick={handleNext} disabled={stepTwoNotDone}>
              {activeStep === steps.length - 1 ? finish : next}
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
              {translate(`mintingProcess.back`)}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                {translate(`mintingProcess.skip`)}
              </Button>
            )}
            {nftType !== 'withoutNftCard' ? (
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleDownload}
                disabled={!nftMinted}
              >
                {translate(`mintingProcess.download`)}
              </Button>
            ) : (
              <></>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{ display: 'flex' }}
              disabled={!nftMinted}
            >
              {translate(`mintingProcess.finish`)}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
