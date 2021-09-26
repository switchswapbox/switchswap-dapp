import { useState } from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';

// material
import {
  Box,
  Card,
  Link,
  Stack,
  Button,
  Dialog,
  SvgIcon,
  Typography,
  ButtonBase,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------
const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default function MaxWidthDialog() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="info"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={
          <SvgIcon color="action">
            <Icon icon="fontisto:wallet" color="white" />
          </SvgIcon>
        }
      >
        Connect
      </Button>

      <Dialog open={open} maxWidth="xs" onClose={handleClose}>
        <DialogTitle sx={{ pb: 1 }}>Connect to a wallet</DialogTitle>
        <DialogContent>
          <Stack spacing={2} alignItems="stretch">
            <Card variant="outlined">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
                sx={{ p: 2 }}
              >
                <Typography variant="subtitle2" align="justify">
                  By connecting a wallet, you agree to Switchswap’{' '}
                  <Link href="#" underline="none" color="info">
                    Terms of Service
                  </Link>{' '}
                  and acknowledge that you have read and understand the{' '}
                  <Link href="#" underline="none" color="info">
                    Switchswap disclaimer
                  </Link>
                  .
                </Typography>
              </Stack>
            </Card>

            <ButtonBase>
              <Card variant="outlined" onClick={handleClose} sx={{ width: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Typography variant="subtitle1">Metamask</Typography>
                  <IconWrapperStyle
                    sx={{
                      ...(1 < 0 && {
                        color: 'error.main',
                        bgcolor: alpha(theme.palette.error.main, 0.16)
                      })
                    }}
                  >
                    <Box component="img" src="./static/icons/shared/metamask.svg" />
                  </IconWrapperStyle>
                </Stack>
              </Card>
            </ButtonBase>
            <ButtonBase>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Typography variant="subtitle1">Crust Network</Typography>
                  <IconWrapperStyle
                    sx={{
                      ...(1 < 0 && {
                        color: 'error.main',
                        bgcolor: alpha(theme.palette.error.main, 0.16)
                      })
                    }}
                  >
                    <Box component="img" src="./static/icons/shared/crust.svg" />
                  </IconWrapperStyle>
                </Stack>
              </Card>
            </ButtonBase>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="info">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
