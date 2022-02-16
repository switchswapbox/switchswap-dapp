import { TransactionReceipt } from '@ethersproject/providers';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import { baseURLBin, compile, CompilerAbstract, pathToURL } from '@remix-project/remix-solidity';
import * as etherscanClient from 'clients/etherscan-client';
import { TEST_CONTRACTS } from 'constants/contract';
import { SOLIDITY_COMPILER_VERSION, SPDX_LICENSE_IDENTIFIER } from 'constants/solcEnvironments';
import { ContractFactory } from 'ethers';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useRef, useState } from 'react';
import { handleNpmImport } from 'utils/content-resolver';
import type { HandleNextBackButton } from '../CreateCollection.types';
const ERC721Features = [{ title: 'Burnable' }, { title: 'Enumarable' }, { title: 'Pausable' }];
const CONTRACT_FILE_NAME = 'MyContract.sol';
const CONTRACT_NAME = 'MyContract';
const ETHERSCAN_API_SECRET_KEY = 'G1UDIXWQ3YZRNQJ6CVVNYZQF1AAHD1JGTK';

(function initSupportedSolcVersion() {
  (pathToURL as any)['soljson-v0.8.11+commit.d7f03943.js'] = baseURLBin;
})();

export default function DeploySmartContract({ handleBackButtonClick }: HandleNextBackButton) {
  const { active, account, library, provider, onboard } = useWeb3();

  const [compiling, setCompiling] = useState(false);
  const [source, setSource] = useState(TEST_CONTRACTS[0].content);
  const [compileResult, setCompileResult] = useState<CompilerAbstract>();
  const [transactionReceipt, setTransactionReceipt] = useState<TransactionReceipt>();
  const [activeStep, setActiveStep] = useState(0);
  //const { library, active, chainId } = useWeb3React<Web3Provider>();
  const chainId = '4';
  const [etherscanApiKey, setEtherscanApiKey] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [publishingError, setPublishingError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700]
      }
    })
  };
  const timer = useRef<number>();
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const key = localStorage.getItem(ETHERSCAN_API_SECRET_KEY);
    setEtherscanApiKey(key || '');
  }, []);

  const handleCompile = async () => {
    setCompiling(true);
    // setPublishingError(false);
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
      // setCompiling(false);
    }
  };

  const handleDeploy = async () => {
    // setDeploying(true);
    try {
      const compiledContract = compileResult?.getContract(CONTRACT_NAME);
      const contractBinary = '0x' + compiledContract?.object.evm.bytecode.object;
      const contractABI = compiledContract?.object.abi;

      const signer = library.getSigner(account);
      console.log('signer: ', signer);
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
      await handlePublishing(txReceipt, compileResult);
    } finally {
      // setDeploying(false);
    }
  };

  const handlePublishing = async (
    txReceipt?: TransactionReceipt,
    compileResult?: CompilerAbstract
  ) => {
    if (!etherscanApiKey) {
      console.log('Please input etherscan api key');
      return;
    }
    setPublishing(true);
    try {
      const verifiedResponse = await etherscanClient.verifyAndPublicContractSourceCode(
        etherscanApiKey,
        chainId + '',
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
      setVerifying(true);
      const verifyStatusResponse = await etherscanClient.codeVerificationStatus(
        etherscanApiKey,
        chainId + '',
        (verifiedResponse.data as any).result
      );
      setVerifying(false);
      if (verifyStatusResponse.data.status === '1') {
        console.log('success verifying');
      } else {
        console.log('error verifying');
      }
      console.log('verifyStatusResponse : ', verifyStatusResponse.data);
    } finally {
    }
  };

  return (
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
        with your currently connected wallet. The creation will cost approximately 0,06749 ETH. The
        exact amount will be determined by your wallet
      </Typography>
      <Button onClick={handleCompile}>Compile</Button>
      <Button onClick={handleDeploy}>Deploy</Button>
      <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
        {[
          {
            label: 'Compile smart contract',
            description: `Your collection is build using your own smart contract therefore it needs to be compiled in machine language.`
          },
          {
            label: 'Deploying your smart contract on blockchain',
            description:
              'You need to make a traction on Ethereum to deploy the smart contract. This transaction will cost 0,06749 ETH for the miners fee.'
          },
          {
            label: 'Verification of smart contract on Etherscan',
            description: `The source code of your smart contract will be published on Etherscan to ensure the transparency of your smart contract.`
          }
        ].map((step, index) => (
          <Step key={step.label} onClick={() => setActiveStep(index)}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ my: 2 }}>
                <div>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                        onClick={() => {
                          if (!loading) {
                            setSuccess(false);
                            setLoading(true);
                            timer.current = window.setTimeout(() => {
                              setSuccess(true);
                              setLoading(false);
                              setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }, 2000);
                          }
                        }}
                      >
                        {index === 0 ? 'Compiling' : index === 1 ? 'Deploying' : 'Verifying'}
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button sx={{ mt: 1, mr: 1 }}>Reset</Button>
        </Paper>
      )}
    </Paper>
  );
}
