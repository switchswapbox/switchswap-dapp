import { useState, useEffect, useRef } from 'react';
import { useTheme, styled } from '@mui/material/styles';

import {
  Box,
  Stack,
  Button,
  SvgIcon,
  Typography,
  useMediaQuery,
  ButtonBase,
  IconButton,
  Divider
} from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import Iconify from 'components/Iconify';
import useWallet from 'hooks/useWallet';
import { Icon } from '@iconify/react';

import { shortenAddress, shortenAddressHeader } from '../../utils/formatAddress';

import React from 'react';
import useLocales from '../../hooks/useLocales';
import Identicons from '@nimiq/identicons';
Identicons.svgPath = './static/identicons.min.svg';

const ConnectWalletPopover = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [openWalletInfo, setOpenWalletInfo] = useState(false);
  const { translate } = useLocales();
  const { network } = useWallet();
  const anchorRef = useRef(null);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const walletInfoAnchorRef = useRef(null);
  const selectedAccountAddress = '0x6d26C4B1239643AfA2c89e8A112d2015b3A62F';
  const [uniqueIcon, setUniqueIcon] = useState<string>('');

  const handleWalletModalOpen = () => {
    // Open Wallet Modal
    // ....
    setWalletIsConnected(true);
  };

  const handleWalletInfoOpen = () => {
    setOpenWalletInfo(true);
  };

  const handleWalletInfoClose = () => {
    setOpenWalletInfo(false);
  };

  const handleDisconnectWallet = () => {
    setWalletIsConnected(false);
    setOpenWalletInfo(false);
  };

  useEffect(() => {
    Identicons.toDataUrl(selectedAccountAddress).then((img: string) => {
      setUniqueIcon(img);
    });
  }, [selectedAccountAddress]);

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
              <Typography variant="caption">Metamask</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography
                variant="caption"
                sx={{ fontWeight: 700 }}
              >{`${network.toLowerCase()}:`}</Typography>
              <Typography variant="caption">
                {smUp && shortenAddress(selectedAccountAddress, 5)}
                {!smUp && shortenAddressHeader(selectedAccountAddress, 5)}
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
                <Typography variant="subtitle2">{`${network.toLowerCase()}:`}</Typography>
                <Typography variant="body2">{shortenAddress(selectedAccountAddress, 5)}</Typography>
              </Stack>
              <Stack direction="row">
                <IconButton color="primary" aria-label="copy" component="span" size="small">
                  <Iconify icon={'akar-icons:copy'} />
                </IconButton>
                <IconButton color="primary" aria-label="copy" component="span" size="small">
                  <Iconify icon={'bx:bx-link-external'} />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Wallet</Typography>
            <Typography variant="body2">Metamask</Typography>
          </Stack>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Network</Typography>
            <Typography variant="body2">Ethereum</Typography>
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
