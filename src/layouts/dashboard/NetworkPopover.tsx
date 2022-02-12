import { useRef, useState } from 'react';
import { Box, MenuItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import Scrollbar from 'components/Scrollbar';
import Iconify from 'components/Iconify';
import useWallet from 'hooks/useWallet';
import { SUPPORTED_CHAINS } from '../../constants/chains';

const ITEM_HEIGHT = 50;

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { name, onChainChange } = useWallet();

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
        {name}
      </Box>
      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Typography variant="subtitle1" sx={{ p: 1.5 }}>
          Networks <Typography component="span">({SUPPORTED_CHAINS.length})</Typography>
        </Typography>
        <Scrollbar sx={{ height: ITEM_HEIGHT * 6, pb: 1 }}>
          {SUPPORTED_CHAINS.map((chain, index) => (
            <MenuItem
              key={chain.currencySymbol + index}
              selected={chain.name === name}
              onClick={() => {
                onChainChange(chain);
                setOpen(false);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={chain.name} src={chain.icon} sx={{ height: '30px' }} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {chain.name}
              </ListItemText>
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
