// material
import { Box, BoxProps } from '@mui/material';
import './LogoStyle.css';
// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return <Box sx={{ height: 30, ...sx }} component="img" src="./static/brand/logo_single.svg" />;
}
