// icons
import { Icon, IconifyIcon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';
import { SxProps } from '@mui/system';
// ----------------------------------------------------------------------

interface Props extends BoxProps {
  sx?: SxProps;
  icon: IconifyIcon | string;
  rotate?: number;
}

export default function Iconify({ icon, sx, rotate = 0, ...other }: Props) {
  return <Box component={Icon} icon={icon} rotate={rotate} sx={{ ...sx }} {...other} />;
}
