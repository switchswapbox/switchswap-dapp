import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import messagCircleOutline from '@iconify/icons-eva/message-circle-outline';
import externaLinkOutline from '@iconify/icons-eva/external-link-outline';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Avatar, Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';

import Identicons from '@nimiq/identicons';
Identicons.svgPath = './static/identicons.min.svg';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { label: 'Explorer', icon: externaLinkOutline, linkTo: '/' },
  { label: 'Support', icon: messagCircleOutline, linkTo: '/' }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [uniqueIcon, setUniqueIcon] = useState();
  useEffect(() => {
    Identicons.toDataUrl('5C5QrSsW6Qgv32Gfqp7QFWqtKaxXz46GesUupg5SQTVsZT7q').then((img) => {
      setUniqueIcon(img);
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: 'transparent'
            }
          })
        }}
      >
        <Avatar alt="My Avatar" src={uniqueIcon} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            5C5QrSsW6Qgv32Gfqp7QFWqtKaxXz46GesUupg5SQTVsZT7q
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Crust Network
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Disconnect
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
