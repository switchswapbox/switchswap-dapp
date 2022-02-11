import { useRef, useState } from 'react';
// material
import { Box, MenuItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import Scrollbar from 'components/Scrollbar';
import Iconify from 'components/Iconify';
import useWallet from 'hooks/useWallet';
import BLOCKCHAIN_NETWORKS from 'constants/BLOCKCHAIN_NETWORKS';

const ITEM_HEIGHT = 50;

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { network, onNetworkChange } = useWallet();

  return (
    <>
      <Box
        component={Button}
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color="primary"
        size="small"
        marginTop={{ xs: 2, sm: 0 }}
        marginLeft={{ sm: 2 }}
        endIcon={<Iconify height={12} icon={'akar-icons:chevron-down'} />}
      >
        {network}
      </Box>
      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Typography variant="subtitle1" sx={{ p: 1.5 }}>
          Networks <Typography component="span">({BLOCKCHAIN_NETWORKS.length})</Typography>
        </Typography>
        <Scrollbar sx={{ height: ITEM_HEIGHT * 6, pb: 1 }}>
          {BLOCKCHAIN_NETWORKS.map((option) => (
            <MenuItem
              key={option.currencySymbol}
              selected={option.currencySymbol === network}
              onClick={() => {
                onNetworkChange(option.currencySymbol);
                setOpen(false);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.name} src={option.icon} sx={{ height: '30px' }} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.name}
              </ListItemText>
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
