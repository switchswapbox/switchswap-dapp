import { useState, useEffect } from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';

// material
import {
  Box,
  Card,
  Alert,
  Link,
  Stack,
  Button,
  Dialog,
  SvgIcon,
  Typography,
  ButtonBase,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import { Icon } from '@iconify/react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

import detectEthereumProvider from '@metamask/detect-provider';
import {
  METAMASK_SELECT_MATIC_URL,
  INSTALL_METAMASK_URL,
  CRUST_WALLET_WIKI
} from '../../assets/COMMON_VARIABLES';

// ----------------------------------------------------------------------
const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default function MaxWidthDialog() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isMetamaskInstalled, setMetamaskInstalled] = useState(true);
  const [isMaticSelected, setMaticSelected] = useState(true);
  const [isCrustInstalled, setCrustInstalled] = useState(true);
  const [isMetamaskConnected, setMetamaskConnected] = useState(false);

  const [metamaskAddr, setMetamaskAddr] = useState(localStorage.getItem('metamaskAddr') || '');

  useEffect(() => {
    localStorage.setItem('metamaskAddr', metamaskAddr);
  }, [metamaskAddr]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const detectMetamask = async () => {
    const provider = await detectEthereumProvider();

    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        setMetamaskInstalled(true);
        setMaticSelected(true);
        const status = await provider.request({ method: 'eth_requestAccounts' });
        setMetamaskAddr(status[0]);
        // console.log(status);
        // SET HOOK HERE
        setMetamaskConnected(true);
      } else {
        setMetamaskInstalled(true);
        setMaticSelected(false);
        setMetamaskConnected(false);
        // console.log('Select Matic');
      }
    } else {
      setMetamaskInstalled(false);
      setMetamaskConnected(false);
      setMaticSelected(true);
      // console.log('Please install MetaMask!');
    }
  };

  const handleConnect = async () => {
    const extensions = await web3Enable('NFT Dapp');
    if (extensions.length === 0) {
      setCrustInstalled(false);
      return;
    }
    const allAccounts = await web3Accounts();
    console.log(allAccounts);
  };

  return (
    <>
      <Button
        color="info"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={
          <SvgIcon color="action">
            <Icon icon="fontisto:wallet" color="white" />
          </SvgIcon>
        }
      >
        Connect
      </Button>

      <Dialog open={open} maxWidth="xs" onClose={handleClose}>
        <DialogTitle sx={{ pb: 1 }}>Connect to a wallet</DialogTitle>
        <DialogContent>
          <Stack spacing={2} alignItems="stretch">
            <Card variant="outlined">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
                sx={{ p: 2 }}
              >
                <Typography variant="subtitle2" align="justify">
                  By connecting a wallet, you agree to Switchswap’{' '}
                  <Link href="#" underline="none" color="info">
                    Terms of Service
                  </Link>{' '}
                  and acknowledge that you have read and understand the{' '}
                  <Link href="#" underline="none" color="info">
                    Switchswap disclaimer
                  </Link>
                  .
                </Typography>
              </Stack>
            </Card>

            <ButtonBase>
              <Card variant="outlined" onClick={detectMetamask} sx={{ width: '100%', p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Typography variant="subtitle1">Metamask</Typography>
                  <IconWrapperStyle
                    sx={{
                      ...(1 < 0 && {
                        color: 'error.main',
                        bgcolor: alpha(theme.palette.error.main, 0.16)
                      })
                    }}
                  >
                    <Box component="img" src="./static/icons/shared/metamask.svg" />
                  </IconWrapperStyle>
                </Stack>
              </Card>
            </ButtonBase>
            <Alert
              severity="error"
              sx={{ width: '100%', display: isMetamaskInstalled ? 'none' : 'flex' }}
              action={
                <Button color="inherit" size="small" href={INSTALL_METAMASK_URL} target="_blank">
                  LEARN
                </Button>
              }
            >
              Install Metamask!
            </Alert>
            <Alert
              severity="warning"
              sx={{ width: '100%', display: isMaticSelected ? 'none' : 'flex' }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  href={METAMASK_SELECT_MATIC_URL}
                  target="_blank"
                >
                  LEARN
                </Button>
              }
            >
              Choose Polygon Network!
            </Alert>
            <Alert
              icon={false}
              severity="success"
              sx={{
                width: '100%',
                wordWrap: 'break-word',
                display: isMetamaskConnected ? 'flex' : 'none'
              }}
            >
              Wallet is connected{'  '}
              <SvgIcon>
                <Icon icon="fxemoji:rocket" />
              </SvgIcon>
            </Alert>
            <ButtonBase>
              <Card variant="outlined" onClick={handleConnect} sx={{ width: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Typography variant="subtitle1">Crust Network</Typography>
                  <IconWrapperStyle
                    sx={{
                      ...(1 < 0 && {
                        color: 'error.main',
                        bgcolor: alpha(theme.palette.error.main, 0.16)
                      })
                    }}
                  >
                    <Box component="img" src="./static/icons/shared/crust.svg" />
                  </IconWrapperStyle>
                </Stack>
              </Card>
            </ButtonBase>
            <Alert
              severity="error"
              sx={{ width: '100%', display: isCrustInstalled ? 'none' : 'flex' }}
              action={
                <Button color="inherit" size="small" href={CRUST_WALLET_WIKI} target="_blank">
                  LEARN
                </Button>
              }
            >
              Install Crust Wallet!
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="info">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}