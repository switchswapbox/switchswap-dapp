import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import useLocales from '../../hooks/useLocales';
// ----------------------------------------------------------------------

// const LANGS = [
//   {
//     value: 'en',
//     label: 'English',
//     icon: './static/icons/ic_flag_en.svg'
//   },
//   {
//     value: 'de',
//     label: 'German',
//     icon: './static/icons/ic_flag_de.svg'
//   },
//   {
//     value: 'fr',
//     label: 'French',
//     icon: './static/icons/ic_flag_fr.svg'
//   }
// ];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { allLang, currentLang, onChangeLang } = useLocales();

  const handleChangeLang = (value: string) => {
    onChangeLang(value);
    setOpen(false);
  };
  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && { bgcolor: 'transparent' })
        }}
      >
        <img src={currentLang.icon} alt={currentLang.label} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        sx={{ py: 1 }}
      >
        {/* <Box sx={{ py: 1 }}> */}
        {allLang.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang.value}
            onClick={() => handleChangeLang(option.value)}
            sx={{ py: 1, px: 2.5 }}
          >
            <ListItemIcon>
              <Box component="img" alt={option.label} src={option.icon} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
              {option.label}
            </ListItemText>
          </MenuItem>
        ))}
        {/* </Box> */}
      </MenuPopover>
    </>
  );
}
