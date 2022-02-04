import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Divider } from '@mui/material';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import { MHidden } from '../../components/@material-extend';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ConnectWalletDialog from './ConnectWalletDialog';
import NetworkPopover from './NetworkPopover';
import NotificationPopover from './NotificationPopover';

import Logo from '../../components/Logo';
import { Link as RouterLink } from 'react-router-dom';

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 0;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: theme.customShadows.z1,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 1)
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  // }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <ToolbarStyle>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'inline-flex', pr: { xs: '5px', sm: '15px', lg: '25px' } }}
        >
          <Logo />
        </Box>

        <MHidden width="xsDown">
          <IconButton
            onClick={onOpenSidebar}
            onMouseEnter={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <NotificationPopover />
          <ConnectWalletDialog />
          <AccountPopover />
          <Divider orientation="vertical" flexItem />
          <NetworkPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
