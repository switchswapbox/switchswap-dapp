import { useRef, useState } from 'react';
// material
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import useNetworks from '../../hooks/useNetworks';
// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { handleChangeNetwork, currentNetwork, allNetworks } = useNetworks();

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,

          ...(open && { bgcolor: 'action.selected' })
        }}
      >
        <Box
          component="img"
          src={currentNetwork.icon}
          alt={currentNetwork.label}
          sx={{ height: '36px' }}
        />
      </MIconButton>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {allNetworks.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentNetwork.value}
              onClick={() => {
                handleChangeNetwork(option.value);
                setOpen(false);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} sx={{ height: '30px' }} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
