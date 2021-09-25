// material
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path d="M67.69 260.27C113.96 341.23 161.79 417.5 216.73 305.62C224.25 291.23 229.73 263.28 242 263.28L242 263.42C254.27 263.42 259.75 291.38 267.27 305.76C322.21 417.64 370.04 341.37 416.31 260.42C419.79 254.31 423.14 248.48 426 243.42C319.96 310.55 328.89 107.75 242 106.14L242 106C155.11 107.61 164.04 310.4 58 243.28C60.86 248.34 64.21 254.17 67.69 260.27" />
          <path d="M62 106C35.49 106 14 127.49 14 154C14 180.51 35.49 202 62 202C88.51 202 110 180.51 110 154C110 127.49 88.51 106 62 106Z" />
          <path d="M422 106C395.49 106 374 127.49 374 154C374 180.51 395.49 202 422 202C448.51 202 470 180.51 470 154C470 127.49 448.51 106 422 106Z" />
        </g>
      </svg>
    </Box>
  );
}
