import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  Avatar,
  Drawer,
  Tooltip,
  Typography,
  CardActionArea
} from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { InfoAccountWallet } from '../../redux/reducer';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { MHidden } from '../../components/@material-extend';
import sidebarConfig from './SidebarConfig';

import { shortenAddress } from '../../utils/formatAddress';

import Identicons from '@nimiq/identicons';
Identicons.svgPath = './static/identicons.min.svg';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

type IconCollapseProps = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

function IconCollapse({ onToggleCollapse, collapseClick }: IconCollapseProps) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2
          })
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0
            })
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const selectedAccountAddress = useSelector((state: InfoAccountWallet) => {
    return state.accountAddress;
  });
  const selectedNetworkName = useSelector((state: InfoAccountWallet) => {
    return state.networkName;
  });

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const infoToDisplay = () => {
    return (
      <>
        <Typography variant="subtitle1" noWrap>
          {shortenAddress(selectedAccountAddress, 5)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {selectedAccountAddress === '' ? 'Hello World' : selectedNetworkName}
        </Typography>
      </>
    );
  };

  const [uniqueIcon, setUniqueIcon] = useState<string>();
  useEffect(() => {
    Identicons.toDataUrl(
      selectedAccountAddress === '' ? 'Hello World' : selectedAccountAddress
    ).then((img: string) => {
      setUniqueIcon(img);
    });
  }, [selectedAccountAddress]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && (
              <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
            )}
          </MHidden>
        </Stack>

        {isCollapse ? (
          <Avatar alt="My Avatar" src={uniqueIcon} sx={{ mx: 'auto', mb: 2 }} />
        ) : (
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar alt="My Avatar" src={uniqueIcon} />
              <Box
                sx={{
                  ml: 2,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {infoToDisplay()}
              </Box>
            </AccountStyle>
          </Link>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
