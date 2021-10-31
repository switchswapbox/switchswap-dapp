import { Icon } from '@iconify/react';
import { Button, IconButton, Typography } from '@mui/material';

import { useSnackbar, VariantType } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';

export default function useSnackbarAction() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSnackbarAction = (
    color: VariantType,
    text: string,
    autoHideDuration: number | null,
    label?: string,
    url?: string
  ) => {
    enqueueSnackbar(
      <div>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </div>,
      {
        variant: color,
        autoHideDuration,
        action: (key) => (
          <>
            {url && (
              <Button
                size="small"
                color={color !== 'default' ? color : 'primary'}
                href={url}
                target="_blank"
              >
                {label}
              </Button>
            )}
            <IconButton size="small" color="inherit" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} width={24} height={24} />
            </IconButton>
          </>
        )
      }
    );
  };
  return onSnackbarAction;
}
