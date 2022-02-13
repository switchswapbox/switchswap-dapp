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
import useWallet from '../../hooks/useWallet';
Identicons.svgPath = './static/identicons.min.svg';

let provider;

const ConnectWalletPopover = () => {
  const theme = useTheme();
  const onSnackbarAction = useSnackbarAction();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { translate } = useLocales();

  const { chain: selectedChain, selectedWallet, onSelectWallet, onDisconnectWallet } = useWallet();

  const [openWalletInfo, setOpenWalletInfo] = useState(false);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const walletInfoAnchorRef = useRef(null);
  const [uniqueIcon, setUniqueIcon] = useState<string>('');
  const [selectedAccountAddress, setSelectedAccountAddress] = useState<string>();
  const [walletNetworkId, setWalletNetworkId] = useState<number>();
  const [onboard, setOnboard] = useState<OnBoardAPI>();
  const [network, setNetwork] = useState<Chain>(selectedChain);

  useEffect(() => {
    const onboard = initOnboard(selectedChain.chainId, {
      address: setSelectedAccountAddress,
      network: setWalletNetworkId,
      wallet: (wallet) => {
        if (wallet.provider) {
          provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
          if (wallet.name) {
            onSelectWallet(wallet.name);
          }
        }
      }
    });

    setOnboard(onboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain]);

  useEffect(() => {
    const found = SUPPORTED_CHAINS.find((chain) => chain.chainId === walletNetworkId);
    if (found) {
      setNetwork(found);
    }
  }, [walletNetworkId])

  useEffect(() => {
    if (selectedWallet && onboard) {
      onboard.walletSelect(selectedWallet);
      setWalletIsConnected(true);
    }
  }, [onboard, selectedWallet]);

  const handleWalletModalOpen = async () => {
    const selected = await onboard?.walletSelect();
    if (selected) {
      const isOk = await onboard?.walletCheck();
      if (!isOk) {
        if (walletNetworkId !== network.chainId) {
          onSnackbarAction('error', translate('connectWallet.incorrectNetwork', {
            network: network.name
          }), 3000);
        }
      }
    }
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
    onDisconnectWallet();
  };

  useEffect(() => {
    if (selectedAccountAddress) {
      Identicons.toDataUrl(selectedAccountAddress).then((img: string) => {
        setUniqueIcon(img);
      });
    }
  }, [selectedAccountAddress]);


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
              <Typography variant="caption">{selectedWallet}</Typography>
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
            <Typography variant="body2">{selectedWallet}</Typography>
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
