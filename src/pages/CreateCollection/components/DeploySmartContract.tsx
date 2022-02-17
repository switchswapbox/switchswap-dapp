import { TransactionReceipt } from '@ethersproject/providers';
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
import { baseURLBin, compile, CompilerAbstract, pathToURL } from '@remix-project/remix-solidity';
import * as etherscanClient from 'clients/etherscan-client';
import { TEST_CONTRACTS } from 'constants/contract';
import { SOLIDITY_COMPILER_VERSION, SPDX_LICENSE_IDENTIFIER } from 'constants/solcEnvironments';
import { ContractFactory } from 'ethers';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { handleNpmImport } from 'utils/content-resolver';
import type { HandleNextBackButton } from '../CreateCollection.types';
import { DoingIcon, SuccessIcon } from './StepperIcons';
const ERC721Features = [{ title: 'Burnable' }, { title: 'Enumarable' }, { title: 'Pausable' }];
const CONTRACT_FILE_NAME = 'MyContract.sol';
const CONTRACT_NAME = 'MyContract';
const ETHERSCAN_API_SECRET_KEY = 'G1UDIXWQ3YZRNQJ6CVVNYZQF1AAHD1JGTK';

const timeout = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

(function initSupportedSolcVersion() {
  (pathToURL as any)['soljson-v0.8.11+commit.d7f03943.js'] = baseURLBin;
})();

export default function DeploySmartContract({ handleBackButtonClick }: HandleNextBackButton) {
  const { watch, handleSubmit } = useFormContext();
  const { active, account, library, provider, onboard, activate } = useWeb3();
  const { chain: selectedChain } = useWallet();
  const [source, setSource] = useState(TEST_CONTRACTS[0].content);
  const [compileResult, setCompileResult] = useState<CompilerAbstract>();
  const [transactionReceipt, setTransactionReceipt] = useState<TransactionReceipt>();
  const [activeStep, setActiveStep] = useState(0);
  const [publishingError, setPublishingError] = useState(false);
  const [etherscanPublishingHx, setEtherscanPublishingHx] = useState('');

  const [compiling, setCompiling] = useState(false);
  const [compilingSuccess, setCompilingSuccess] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployingSuccess, setDeployingSuccess] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishingSuccess, setPublishingSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyingSuccess, setVerifyingSuccess] = useState(false);

  const startDeploying = async () => {
    setActiveStep((prevActiveStep) => 0);
    setCompiling(true);
    await timeout(2000);
    setCompiling(false);
    setCompilingSuccess(true);

    setActiveStep((prevActiveStep) => 1);
    setDeploying(true);
    await timeout(2000);
    setDeploying(false);
    setDeployingSuccess(true);

    setActiveStep((prevActiveStep) => 2);
    setPublishing(true);
    await timeout(2000);
    setPublishing(false);
    setPublishingSuccess(true);

    setActiveStep((prevActiveStep) => 3);
    setVerifying(true);
    await timeout(2000);
    setVerifying(false);
    setVerifyingSuccess(true);
  };

  const handleCompile = async () => {
    try {
      const response = (await compile(
        {
          [CONTRACT_FILE_NAME]: {
            content: source
          }
        },
        {
          version: SOLIDITY_COMPILER_VERSION
        },
        handleNpmImport
      )) as CompilerAbstract;

      if (response.data.errors) {
        console.log('error');
        return;
      }
      console.log('success');
      console.log('All contract compileResult: ', response);
      setCompileResult(response);
    } finally {
    }
  };

  const handleDeploy = async () => {
    try {
      await onboard.walletCheck();
      const compiledContract = compileResult?.getContract(CONTRACT_NAME);
      const contractBinary = '0x' + compiledContract?.object.evm.bytecode.object;
      const contractABI = compiledContract?.object.abi;

      const signer = library.getSigner(account);

      const contractFactory: ContractFactory = new ContractFactory(
        contractABI,
        contractBinary,
        signer
      );

      const deployingContract = await contractFactory.deploy();
      const txReceipt = await deployingContract.deployTransaction.wait(1);
      console.log('success');
      console.log('transactionReceipt: ', txReceipt);
      setTransactionReceipt(txReceipt);
      // await handlePublishing(txReceipt, compileResult);
    } catch (e) {
      console.log('Error', e);
    } finally {
      // setDeploying(false);
    }
  };

  const handlePublishing = async (
    txReceipt?: TransactionReceipt,
    compileResult?: CompilerAbstract
  ) => {
    setPublishing(true);
    try {
      console.log('start publishing');
      const verifiedResponse = await etherscanClient.verifyAndPublicContractSourceCode(
        ETHERSCAN_API_SECRET_KEY,
        selectedChain.chainId + '',
        {
          address: txReceipt?.contractAddress || '',
          name: CONTRACT_FILE_NAME + ':' + CONTRACT_NAME,
          sourceCode: JSON.stringify({
            sources: compileResult?.source.sources,
            language: 'Solidity'
          }),
          compilerversion: 'v' + SOLIDITY_COMPILER_VERSION,
          licenseType: SPDX_LICENSE_IDENTIFIER.MIT
        }
      );
      setPublishing(false);
      console.log('verifiedResponse: ', verifiedResponse.data);
      if (verifiedResponse.data.status === '0') {
        console.log('error publishing');
        setPublishingError(true);
        return;
      }
      if (verifiedResponse.data.status === '1') {
        console.log('success publishing', verifiedResponse.data.result);
      }
      setEtherscanPublishingHx((verifiedResponse.data as any).result);
    } finally {
    }
  };

  // (verifiedResponse.data as any).result = etherscanPublishingHx
  const handleGetPublishingStatus = async (etherscanPublishingHx: string) => {
    setVerifying(true);
    const verifyStatusResponse = await etherscanClient.codeVerificationStatus(
      ETHERSCAN_API_SECRET_KEY,
      selectedChain.chainId + '',
      etherscanPublishingHx
    );
    setVerifying(false);
    if (
      verifyStatusResponse.data.status === '1' ||
      verifyStatusResponse.data.message === 'Already Verified'
    ) {
      console.log('success verifying');
    } else {
      console.log('error verifying');
    }
    console.log('verifyStatusResponse : ', verifyStatusResponse.data);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="large"
          disabled={!active}
          color="info"
          sx={{ backgroundColor: '#377dff', px: 5, mb: 5 }}
          onClick={() => {
            startDeploying();
          }}
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
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
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
        <Button onClick={handleCompile}>Compile</Button>
        <Button onClick={handleDeploy}>Deploy</Button>
        <Button
          onClick={() => {
            handlePublishing(transactionReceipt, compileResult);
          }}
        >
          Publish
        </Button>
        <Button
          onClick={() => {
            handleGetPublishingStatus(etherscanPublishingHx);
          }}
        >
          Get Publishing Status
        </Button>
        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          <Step key={'key1'} onClick={() => setActiveStep(0)}>
            <StepLabel
              StepIconComponent={compiling ? DoingIcon : compilingSuccess ? SuccessIcon : undefined}
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
              StepIconComponent={deploying ? DoingIcon : deployingSuccess ? SuccessIcon : undefined}
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
                publishing ? DoingIcon : publishingSuccess ? SuccessIcon : undefined
              }
            >
              Publish smart contract contract on Etherscan
            </StepLabel>
            <StepContent>
              <Typography>
                The source code of your smart contract will be published on Etherscan to ensure the
                transparency of your smart contract.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key4'} onClick={() => setActiveStep(3)}>
            <StepLabel
              StepIconComponent={verifying ? DoingIcon : verifyingSuccess ? SuccessIcon : undefined}
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
