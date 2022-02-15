import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import useLocales from 'hooks/useLocales';
import useWallet from 'hooks/useWallet';
import { useEffect, useRef, useState } from 'react';
import Iconify from '../../../components/Iconify';
import type { HandleNextBackButton } from '../CreateCollection.types';
import SmartContractDialogs from './SmartContractDialogs';

export default function ConnectBlockchain({ handleNextButtonClick }: HandleNextBackButton) {
  const { translate } = useLocales();
  const [click, setClick] = useState<HTMLButtonElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { chain: selectedChain, address, selectedWallet } = useWallet();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleClickCopyButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(address);
    setClick(event.currentTarget);
    setTimeout(() => {
      setClick(null);
    }, 1500);
  };

  const handleCloseCopyButton = () => {
    setClick(null);
  };

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
    if (address && selectedWallet) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [address, selectedWallet]);

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  return (
    <Card sx={{ p: 3 }}>
      <Typography
        variant="overline"
        sx={{ mb: 3, display: isWalletConnected ? 'none' : 'block', color: 'text.secondary' }}
      >
        Select network & Connect wallet
      </Typography>

      <Paper
        sx={{
          p: 3,
          mt: 4,
          mb: 3,
          width: 1,
          display: isWalletConnected ? 'none' : 'block',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
        }}
      >
        <Typography variant="subtitle2">
          You need to connect a wallet to create the NFTs collection
        </Typography>
      </Paper>

      <Box sx={{ display: isWalletConnected ? 'block' : 'none' }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                mb: 2,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
                Settings
              </Typography>
              <TextField
                id="nameSmartContract"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                id="tokenSymbol"
                label="Token Symbol"
                value={symbol}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setSymbol(e.target.value.toUpperCase());
                }}
              />
              <Divider sx={{ my: 3 }} />
              <Typography
                variant="overline"
                sx={{ mb: 2, display: 'block', color: 'text.secondary' }}
              >
                Features
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Enumerable" />
                <FormControlLabel control={<Checkbox />} label="Burnable" />
              </FormGroup>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Preview Collection
              </Typography>

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2">{name || 'Collection Name'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">{symbol || 'CRUSTNFT'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Network
                  </Typography>
                  <Typography variant="subtitle2">Ethereum</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Address
                  </Typography>
                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                    0x3E6b21EDDa47B7075cDd5AE5b8E6D50cBeD0d519
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>
                <Paper
                  sx={{
                    mb: 3,
                    p: 0.5,
                    border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`,
                    '& > :not(style)': {
                      m: 0.5
                    }
                  }}
                >
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1}>
            <SmartContractDialogs />
            <Button variant="outlined" size="small" fullWidth={false}>
              Our commitments
            </Button>
          </Stack>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="I agree with the smart contract provided by Crustnft"
          />
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            size="large"
            disabled={!(address && selectedWallet)}
            startIcon={<Iconify icon={'fluent:next-28-regular'} />}
            sx={{ px: 5 }}
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
            You're about to create a new collection on Ethereum and will have to confirm a
            transaction with your currently connected wallet. The creation will cost approximately
            0,06749 ETH. The exact amount will be determined by your wallet
          </Typography>

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
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>
            Deploy
          </Button>
        </Paper>
      </Box>
    </Card>
  );
}
