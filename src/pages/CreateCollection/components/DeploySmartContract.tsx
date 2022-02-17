import { JsonRpcSigner, TransactionReceipt } from '@ethersproject/providers';
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
import { DoingIcon, SuccessIcon } from './StepperIcons';
const ERC721Features = [{ title: 'Burnable' }, { title: 'Enumarable' }, { title: 'Pausable' }];
const CONTRACT_FILE_NAME = 'MyContract.sol';
const CONTRACT_NAME = 'MyContract';
const ETHERSCAN_API_SECRET_KEY = 'G1UDIXWQ3YZRNQJ6CVVNYZQF1AAHD1JGTK';

(function initSupportedSolcVersion() {
  (pathToURL as any)['soljson-v0.8.11+commit.d7f03943.js'] = baseURLBin;
})();

export default function DeploySmartContract() {
  const { watch, handleSubmit } = useFormContext();
  const { active, account, library, provider, onboard, activate } = useWeb3();
  const { chain: selectedChain } = useWallet();
  const [source, setSource] = useState(TEST_CONTRACTS[0].content);
  const [activeStep, setActiveStep] = useState(0);

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

  const startDeploying = async () => {
    try {
      setActiveStep((prevActiveStep) => 0);
      setCompiling(true);
      const compileResult = await handleCompile(source);
      setCompiling(false);
      setCompilingSuccess(true);
      if (compileResult) {
        setActiveStep((prevActiveStep) => 1);
        setDeploying(true);
        const signer = library?.getSigner(account);
        if (signer) {
          const txReceipt = await handleDeploy(compileResult, signer);
          setDeploying(false);
          setDeployingSuccess(true);
          setActiveStep((prevActiveStep) => 2);
          setPublishing(true);
          const etherscanPublishingHx = await handlePublishing(txReceipt, compileResult);
          setPublishing(false);
          setPublishingSuccess(true);

          if (etherscanPublishingHx) {
            setActiveStep((prevActiveStep) => 3);
            setVerifying(true);
            await handleGetPublishingStatus(etherscanPublishingHx);
            setVerifying(false);
            setVerifyingSuccess(true);
          }
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleCompile = async (source: string): Promise<CompilerAbstract | undefined> => {
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
    return response;
  };

  const handleDeploy = async (
    compileResult: CompilerAbstract,
    signer: JsonRpcSigner
  ): Promise<TransactionReceipt> => {
    const compiledContract = compileResult?.getContract(CONTRACT_NAME);
    const contractBinary = '0x' + compiledContract?.object.evm.bytecode.object;
    const contractABI = compiledContract?.object.abi;

    const contractFactory: ContractFactory = new ContractFactory(
      contractABI,
      contractBinary,
      signer
    );

    const deployingContract = await contractFactory.deploy();
    const txReceipt = await deployingContract.deployTransaction.wait(1);
    console.log('success');
    console.log('transactionReceipt: ', txReceipt);
    return txReceipt;
  };

  const handlePublishing = async (
    txReceipt?: TransactionReceipt,
    compileResult?: CompilerAbstract
  ): Promise<string | undefined> => {
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
    console.log('verifiedResponse: ', verifiedResponse.data);
    if (verifiedResponse.data.status === '0') {
      console.log('error publishing');
      setPublishingError(true);
      return;
    }
    if (verifiedResponse.data.status === '1') {
      console.log('success publishing', verifiedResponse.data.result);
    }
    // return etherscan publishing hash
    return (verifiedResponse.data as any).result;
  };

  const handleGetPublishingStatus = async (etherscanPublishingHx: string) => {
    const verifyStatusResponse = await etherscanClient.codeVerificationStatus(
      ETHERSCAN_API_SECRET_KEY,
      selectedChain.chainId + '',
      etherscanPublishingHx
    );
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
