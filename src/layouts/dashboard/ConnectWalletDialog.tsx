import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { alpha, useTheme, styled } from '@mui/material/styles';

// material
import {
  Box,
  Card,
  List,
  Link,
  Alert,
  Stack,
  Button,
  Dialog,
  SvgIcon,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  ListItemButton,
  ListItemText,
  Collapse
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Icon } from '@iconify/react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  METAMASK_SELECT_POLYGON_URL,
  INSTALL_METAMASK_URL,
  CRUST_WALLET_WIKI
} from '../../assets/COMMON_VARIABLES';

import { getCrustMainnetAddress, shortenAddress } from '../../utils/formatAddress';
import { changeAccountWallet } from '../../reduxStore/reducerSelectAccount';
import React from 'react';
import useLocales from '../../hooks/useLocales';
// ----------------------------------------------------------------------
const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const MaxWidthDialog = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const [displayMessageAccSelected, setDisplayMessageAccSelected] = useState({
    metamask: false,
    crust: false
  });
  const [openCrust, setOpenCrust] = useState(false);
  const [isMetamaskInstalled, setMetamaskInstalled] = useState(true);
  const [ispolygonSelected, setPolygonSelected] = useState(true);
  const [isCrustInstalled, setCrustInstalled] = useState(true);
  const walletActive = localStorage.getItem('walletActive') || '';
  const [isCrustWalletActive, setIsCrustWalletActive] = useState(walletActive === 'crust');
  const [isMetamaskWalletActive, setIsMetamaskWalletActive] = useState(walletActive === 'metamask');
  const [crustAllAccounts, setCrustAllAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedCrustAccount, setselectedCrustAccount] = useState(
    localStorage.getItem('selectedCrustAccount') || ''
  );
  const [selectedMetamaskAccount, setselectedMetamaskAccount] = useState(
    localStorage.getItem('selectedMetamaskAccount') || ''
  );

  const updateInfoWallet = () => {
    dispatch(
      changeAccountWallet({
        accountAddress: isMetamaskWalletActive
          ? selectedMetamaskAccount
          : isCrustWalletActive
          ? selectedCrustAccount
          : '',
        networkName: isMetamaskWalletActive ? 'Polygon' : isCrustWalletActive ? 'Crust' : ''
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('walletActive', isMetamaskWalletActive ? 'metamask' : 'crust');
    localStorage.setItem('selectedMetamaskAccount', selectedMetamaskAccount);
    localStorage.setItem('selectedCrustAccount', selectedCrustAccount);
    updateInfoWallet();
  }, [selectedMetamaskAccount, selectedCrustAccount, isMetamaskWalletActive]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCrust(false);
    setDisplayMessageAccSelected({ metamask: false, crust: false });
  };

  const handleActivateMetamask = () => {
    setIsMetamaskWalletActive(true);
    setIsCrustWalletActive(false);
  };

  const handleActivateCrust = () => {
    setIsMetamaskWalletActive(false);
    setIsCrustWalletActive(true);
  };

  const handleConnectMetamaskWallet = async () => {
    const provider = await detectEthereumProvider();
    setDisplayMessageAccSelected({ metamask: false, crust: false });
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        setMetamaskInstalled(true);
        setPolygonSelected(true);
        const status = await provider.request({ method: 'eth_requestAccounts' });
        setselectedMetamaskAccount(status[0]);
        // console.log(status);
        // SET HOOK HERE
        setDisplayMessageAccSelected({ metamask: true, crust: false });
        handleActivateMetamask();
      } else {
        setMetamaskInstalled(true);
        setPolygonSelected(false);
        // console.log('Select Polygon');
      }
    } else {
      setMetamaskInstalled(false);
      setPolygonSelected(true);
      // console.log('Please install MetaMask!');
    }
  };

  const handleConnectCrustWallet = async () => {
    setDisplayMessageAccSelected({ metamask: false, crust: false });
    if (!openCrust) {
      const extensions = await web3Enable('NFT Dapp');
      if (extensions.length === 0) {
        setCrustInstalled(false);
        return;
      }
      const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();
      setCrustAllAccounts([...allAccounts]);
      setOpenCrust(true);
    } else {
      setOpenCrust(false);
    }
  };

  const handleSelectAccountCrust = (address: string, index: number) => {
    setselectedCrustAccount(address);
    localStorage.setItem('selectedAccountCrustIndex', index.toString());
    setOpenCrust(false);
    handleActivateCrust();
    setDisplayMessageAccSelected({ metamask: false, crust: true });
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
        {translate(`connectWallet.myWallet`)}
      </Button>

      <Dialog open={open} maxWidth="xs" onClose={handleClose}>
        <DialogTitle sx={{ pb: 1 }}>{translate(`connectWallet.management`)} </DialogTitle>
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
                  {translate(`connectWallet.agreement`)}
                  <Link
                    href="#/terms-of-service"
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="info"
                  >
                    {translate(`connectWallet.term`)}
                  </Link>{' '}
                  {translate(`connectWallet.acknowledge`)}{' '}
                  <Link href="#" underline="none" color="info">
                    {translate(`connectWallet.disclaimer`)}
                  </Link>
                  .
                </Typography>
              </Stack>
            </Card>
            {/* //////////////////////////////////////////////////////////////////////////////////
            Metamask management
            ////////////////////////////////////////////////////////////////////////////////// */}
            <List
              sx={{ width: '100%', bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ p: 2 }}
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
              }
            >
              <ListItemButton onClick={handleConnectMetamaskWallet}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <SvgIcon>
                    <Icon
                      icon="akar-icons:circle-check-fill"
                      color={isMetamaskWalletActive ? '#5be584' : '#C4CDD5'}
                    />
                  </SvgIcon>
                  <ListItemText
                    primary={
                      selectedMetamaskAccount === '' ? (
                        <Typography
                          align="left"
                          variant="subtitle2"
                          sx={{ color: 'text.primary' }}
                          noWrap
                        >
                          {translate(`connectWallet.connect`)}
                        </Typography>
                      ) : (
                        <Typography
                          align="left"
                          variant="subtitle2"
                          sx={{ color: 'text.primary' }}
                          noWrap
                        >
                          {selectedMetamaskAccount !== ''
                            ? `${shortenAddress(selectedMetamaskAccount, 10)}`
                            : ''}
                        </Typography>
                      )
                    }
                  />
                </Stack>
              </ListItemButton>
            </List>
            <Alert
              severity="error"
              sx={{ width: '100%', display: isMetamaskInstalled ? 'none' : 'flex' }}
              action={
                <Button color="inherit" size="small" href={INSTALL_METAMASK_URL} target="_blank">
                  {translate(`connectWallet.learn`)}
                </Button>
              }
            >
              {translate(`connectWallet.install`)}
            </Alert>
            <Alert
              severity="warning"
              sx={{ width: '100%', display: ispolygonSelected ? 'none' : 'flex' }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  href={METAMASK_SELECT_POLYGON_URL}
                  target="_blank"
                >
                  {translate(`connectWallet.learn`)}
                </Button>
              }
            >
              {translate(`connectWallet.choose`)}
            </Alert>
            <Alert
              icon={false}
              severity="success"
              sx={{
                width: '100%',
                wordWrap: 'break-word',
                display: displayMessageAccSelected.metamask ? 'flex' : 'none'
              }}
            >
              {translate(`connectWallet.selected`)}
              {'  '}
              <SvgIcon>
                <Icon icon="fxemoji:rocket" />
              </SvgIcon>
            </Alert>
            {/* //////////////////////////////////////////////////////////////////////////////////
            Crust management
            ////////////////////////////////////////////////////////////////////////////////// */}
            <List
              sx={{ width: '100%', bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Typography variant="subtitle1">{translate(`connectWallet.network`)}</Typography>
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
              }
            >
              <ListItemButton onClick={handleConnectCrustWallet}>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <SvgIcon>
                      <Icon
                        icon="akar-icons:circle-check-fill"
                        color={isCrustWalletActive ? '#5be584' : '#C4CDD5'}
                      />
                    </SvgIcon>
                    <ListItemText
                      primary={
                        selectedCrustAccount === '' ? (
                          <Typography
                            align="left"
                            variant="subtitle2"
                            sx={{ color: 'text.primary' }}
                            noWrap
                          >
                            {translate(`connectWallet.select`)}
                          </Typography>
                        ) : (
                          <Typography
                            align="left"
                            variant="subtitle2"
                            sx={{ color: 'text.primary' }}
                            noWrap
                          >
                            {selectedCrustAccount !== ''
                              ? `${shortenAddress(
                                  getCrustMainnetAddress(selectedCrustAccount),
                                  10
                                )}`
                              : ''}
                          </Typography>
                        )
                      }
                    />
                  </Stack>
                  {openCrust ? <ExpandLess /> : <ExpandMore />}
                </Stack>
              </ListItemButton>
              <Collapse in={openCrust} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {crustAllAccounts.map((account, index) => (
                    <ListItemButton
                      key={account.address}
                      sx={{ pl: 4 }}
                      onClick={() =>
                        handleSelectAccountCrust(getCrustMainnetAddress(account.address), index)
                      }
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <SvgIcon>
                          <Icon icon="akar-icons:circle-check-fill" color="#C4CDD5" />
                        </SvgIcon>
                        <Box sx={{ width: '100%' }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Typography variant="body2">
                              {shortenAddress(getCrustMainnetAddress(account.address), 10)}
                            </Typography>
                            <IconWrapperStyle
                              sx={{
                                ...(1 < 0 && {
                                  color: 'error.main',
                                  bgcolor: alpha(theme.palette.error.main, 0.16)
                                })
                              }}
                            ></IconWrapperStyle>
                          </Stack>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
            <Alert
              severity="error"
              sx={{ width: '100%', display: isCrustInstalled ? 'none' : 'flex' }}
              action={
                <Button color="inherit" size="small" href={CRUST_WALLET_WIKI} target="_blank">
                  {translate(`connectWallet.learn`)}
                </Button>
              }
            >
              {translate(`connectWallet.installCrust`)}
            </Alert>
            <Alert
              icon={false}
              severity="success"
              sx={{
                width: '100%',
                wordWrap: 'break-word',
                display: displayMessageAccSelected.crust ? 'flex' : 'none'
              }}
            >
              {translate(`connectWallet.default`)}
              {'  '}
              <SvgIcon>
                <Icon icon="fxemoji:rocket" />
              </SvgIcon>
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="info">
            {translate(`connectWallet.close`)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(MaxWidthDialog);
