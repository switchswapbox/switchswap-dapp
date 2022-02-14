import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import Iconify from '../../../components/Iconify';

const ERC721Features = [{ title: 'Burnable' }, { title: 'Enumarable' }, { title: 'Pausable' }];

export default function DeploySmartContract() {
  const [activeStep, setActiveStep] = useState(0);

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
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Deploy the collection on Ethereum
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
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
              Preview Blockchain
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Network
                </Typography>
                <Typography variant="subtitle2">Ethereum</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Wallet Address
                </Typography>
                <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                  0x6d26C4B1239643AfA2c89e8A112d2015b3A62F
                </Typography>
              </Stack>
            </Stack>
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

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Standard
                </Typography>
                <Typography variant="subtitle2">ERC721</Typography>
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

      <Box>
        <Button size="small" startIcon={<Iconify icon={'fluent:next-28-regular'} rotate={2} />}>
          Back
        </Button>
      </Box>
    </Card>
  );
}
