import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { TEST_CONTRACTS } from 'constants/contract';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  compileSmartContract,
  deploySmartContract,
  getPublishingStatus,
  publishSmartContract
} from 'services/createSmartContract/evmCompatible/';
import { DoingIcon, ErrorIcon, SuccessIcon } from './StepperIcons';

export default function DeploySmartContract() {
  const { watch, handleSubmit } = useFormContext();
  const { active, account, library, onboard } = useWeb3();
  const { chain: selectedChain } = useWallet();
  const [activeStep, setActiveStep] = useState(0);
  const source = TEST_CONTRACTS[0].content;

  const [startedCreation, setStartedCreation] = useState(false);

  const [compiling, setCompiling] = useState(false);
  const [compilingSuccess, setCompilingSuccess] = useState(false);
  const [compilingError, setCompilingError] = useState(false);

  const [deploying, setDeploying] = useState(false);
  const [deployingSuccess, setDeployingSuccess] = useState(false);
  const [deployingError, setDeployingError] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [publishingSuccess, setPublishingSuccess] = useState(false);
  const [publishingError, setPublishingError] = useState(false);

  const [verifying, setVerifying] = useState(false);
  const [verifyingSuccess, setVerifyingSuccess] = useState(false);
  const [verifyingError, setVerifyingError] = useState(false);

  const createCollection = async () => {
    setStartedCreation(true);

    setActiveStep((prevActiveStep) => 0);
    setCompiling(true);
    const compileResult = await compileSmartContract(source);
    setCompiling(false);

    if (compileResult) {
      setCompilingSuccess(true);
      await onboard?.walletCheck();
      console.log('library', library);
      const signer = library?.getSigner(account);

      setActiveStep((prevActiveStep) => 1);
      setDeploying(true);
      if (signer) {
        const txReceipt = await deploySmartContract(compileResult, signer);
        setDeploying(false);
        if (txReceipt) {
          setDeployingSuccess(true);
          setActiveStep((prevActiveStep) => 2);
          setPublishing(true);
          const etherscanPublishingHx = await publishSmartContract(
            selectedChain.chainId,
            txReceipt,
            compileResult
          );
          setPublishing(false);

          if (etherscanPublishingHx) {
            setPublishingSuccess(true);
            setActiveStep((prevActiveStep) => 3);
            setVerifying(true);
            const publishingStatus = await getPublishingStatus(
              etherscanPublishingHx,
              selectedChain.chainId
            );
            setVerifying(false);

            if (publishingStatus) {
              setVerifyingSuccess(true);
            } else {
              setVerifyingError(true);
            }
          } else {
            setPublishingError(true);
          }
        } else {
          setDeployingError(true);
        }
      }
    } else {
      setCompilingError(true);
    }
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="large"
          disabled={!active}
          color="info"
          sx={{
            backgroundColor: '#377dff',
            px: 5,
            display: startedCreation ? 'none' : 'block'
          }}
          onClick={handleSubmit(createCollection)}
        >
          Deploy
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          width: 1,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`,
          display: startedCreation ? 'block' : 'none'
        }}
      >
        <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
          Status
        </Typography>
        <Typography variant="body2">
          You're about to create a new collection on Ethereum and will have to confirm a transaction
          with your currently connected wallet. The creation will cost approximately 0,06749 ETH.
          The exact amount will be determined by your wallet
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          <Step key={'key1'} onClick={() => setActiveStep(0)}>
            <StepLabel
              StepIconComponent={
                compiling
                  ? DoingIcon
                  : compilingSuccess
                  ? SuccessIcon
                  : compilingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Compile smart contract
            </StepLabel>
            <StepContent>
              <Typography>
                Your collection is build using your own smart contract therefore it needs to be
                compiled in machine language.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key2'} onClick={() => setActiveStep(1)}>
            <StepLabel
              StepIconComponent={
                deploying
                  ? DoingIcon
                  : deployingSuccess
                  ? SuccessIcon
                  : deployingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Deploy smart contract
            </StepLabel>
            <StepContent>
              <Typography>
                You need to make a traction on Ethereum to deploy the smart contract. This
                transaction will cost 0,06749 ETH for the miners fee.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key3'} onClick={() => setActiveStep(2)}>
            <StepLabel
              StepIconComponent={
                publishing
                  ? DoingIcon
                  : publishingSuccess
                  ? SuccessIcon
                  : publishingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Publish smart contract contract on Etherscan
            </StepLabel>
            <StepContent>
              <Typography>
                The source code of your smart contract will be published on Etherscan to ensure its
                transparency.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key4'} onClick={() => setActiveStep(3)}>
            <StepLabel
              StepIconComponent={
                verifying
                  ? DoingIcon
                  : verifyingSuccess
                  ? SuccessIcon
                  : verifyingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Verify status on Etherscan
            </StepLabel>
            <StepContent>
              <Typography>Waiting for the verification to be treated by Etherscan</Typography>
            </StepContent>
          </Step>
        </Stepper>
      </Paper>
    </>
  );
}
