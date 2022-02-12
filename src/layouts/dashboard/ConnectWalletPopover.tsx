import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  SvgIcon,
  Typography,
  useMediaQuery,
  ButtonBase,
  IconButton,
  Divider,
  Link
} from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import Iconify from 'components/Iconify';
import { ethers } from 'ethers';
import { Icon } from '@iconify/react';

import { shortenAddress, shortenAddressHeader } from '../../utils/formatAddress';

import useLocales from '../../hooks/useLocales';
import Identicons from '@nimiq/identicons';
import { initOnboard } from '../../services/blocknative';
import { API as OnBoardAPI } from 'bnc-onboard/dist/src/interfaces';
import { SUPPORTED_CHAINS } from '../../constants/chains';
import { Chain } from '../../interfaces/chain';
import useSnackbarAction from '../../hooks/useSnackbarAction';
Identicons.svgPath = './static/identicons.min.svg';

let provider;

const ConnectWalletPopover = () => {
  const theme = useTheme();
  const onSnackbarAction = useSnackbarAction();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [openWalletInfo, setOpenWalletInfo] = useState(false);
  const { translate } = useLocales();
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const walletInfoAnchorRef = useRef(null);

  const [uniqueIcon, setUniqueIcon] = useState<string>('');

  const [selectedAccountAddress, setSelectedAccountAddress] = useState<string>();
  const [network, setNetwork] = useState<Chain>();
  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useState<OnBoardAPI>();

  useEffect(() => {
    const onboard = initOnboard({
      address: setSelectedAccountAddress,
      network: (networkId) => {
        const found = SUPPORTED_CHAINS.find((chain) => chain.chainId === networkId);
        if (found) {
          setNetwork(found);
        }
      },
      wallet: (wallet) => {
        if (wallet.provider) {
          setWallet(wallet);

          provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
          if (wallet.name) {
            window.localStorage.setItem('selectedWallet', wallet.name);
          }
        } else {
          provider = null;
          setWallet({});
        }
      }
    });

    setOnboard(onboard);
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = getSelectedWallet();

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
      setWalletIsConnected(true);
    }
  }, [onboard]);

  const handleWalletModalOpen = async () => {
    const selected = await onboard?.walletSelect();
    setWalletIsConnected(selected || false);
  };

  const handleWalletInfoOpen = () => {
    setOpenWalletInfo(true);
  };

  const handleWalletInfoClose = () => {
    setOpenWalletInfo(false);
  };

  const handleDisconnectWallet = () => {
    onboard?.walletReset();
    setWalletIsConnected(false);
    setOpenWalletInfo(false);
    localStorage.removeItem('selectedWallet');
  };

  useEffect(() => {
    if (selectedAccountAddress) {
      Identicons.toDataUrl(selectedAccountAddress).then((img: string) => {
        setUniqueIcon(img);
      });
    }
  }, [selectedAccountAddress]);

  const getSelectedWallet = () => localStorage.getItem('selectedWallet');

  const handleCopyAddress = () => {
    if (selectedAccountAddress) {
      navigator.clipboard.writeText(selectedAccountAddress);
      onSnackbarAction('success', translate('connectWallet.copiedAddress'), 3000);
    }
  };

  return (
    <>
      {smUp && !walletIsConnected && (
        <Button
          color="info"
          variant="contained"
          onClick={handleWalletModalOpen}
          sx={{ backgroundColor: '#377dff' }}
          startIcon={
            <SvgIcon color="action">
              <Icon icon="fontisto:wallet" color="white" />
            </SvgIcon>
          }
        >
          {translate(`connectWallet.myWallet`)}
        </Button>
      )}

      {!smUp && !walletIsConnected && (
        <ButtonBase onClick={handleWalletModalOpen}>
          <SvgIcon>
            <Icon icon="fontisto:wallet" color="#377dff" />
          </SvgIcon>
        </ButtonBase>
      )}

      {walletIsConnected && (
        <Box
          component={Button}
          ref={walletInfoAnchorRef}
          onClick={handleWalletInfoOpen}
          color="primary"
          size="small"
          marginTop={{ xs: 2, sm: 0 }}
          marginLeft={{ sm: 2 }}
          endIcon={<Iconify height={12} icon={'akar-icons:chevron-down'} />}
        >
          <Stack direction="column">
            <Stack direction="row">
              <Typography variant="caption">{getSelectedWallet()}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{`${(
                network?.currencySymbol || ''
              ).toLowerCase()}:`}</Typography>
              <Typography variant="caption">
                {smUp && shortenAddress(selectedAccountAddress || '', 5)}
                {!smUp && shortenAddressHeader(selectedAccountAddress || '', 5)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      <MenuPopover
        open={openWalletInfo}
        onClose={handleWalletInfoClose}
        anchorEl={walletInfoAnchorRef.current}
        sx={{ width: 220 }}
      >
        <Stack alignItems="center" sx={{ mt: 2 }} spacing={1}>
          <Box component="img" src={uniqueIcon} sx={{ height: 50 }} />
          <Box sx={{ backgroundColor: '#EAECEF', padding: 0.5, borderRadius: 0.5 }}>
            <Stack direction="row" spacing={0.5}>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle2">{`${(
                  network?.currencySymbol || ''
                ).toLowerCase()}:`}</Typography>
                <Typography variant="body2">
                  {shortenAddress(selectedAccountAddress || '', 5)}
                </Typography>
              </Stack>
              <Stack direction="row">
                <IconButton
                  color="primary"
                  aria-label="copy"
                  component="span"
                  size="small"
                  onClick={handleCopyAddress}
                >
                  <Iconify icon={'akar-icons:copy'} />
                </IconButton>
                <Link
                  href={network?.blockExplorerUrl + '/address/' + selectedAccountAddress}
                  target="_blank"
                >
                  <IconButton color="primary" aria-label="copy" component="span" size="small">
                    <Iconify icon={'bx:bx-link-external'} />
                  </IconButton>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Wallet</Typography>
            <Typography variant="body2">{getSelectedWallet()}</Typography>
          </Stack>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Network</Typography>
            <Typography variant="body2">{network?.name}</Typography>
          </Stack>
        </Box>
        <Divider sx={{ mt: 1 }} />
        <Box sx={{ p: 2 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleDisconnectWallet}>
            {translate(`dashboard.disconnect`)}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};

export default React.memo(ConnectWalletPopover);
