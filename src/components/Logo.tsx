// material
import { Box, BoxProps } from '@mui/material';
import './LogoStyle.css';
// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return (
    <Box sx={{ width: 30, height: 30, ...sx }}>
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 306 306"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient
            id="grd1"
            gradientUnits="userSpaceOnUse"
            x1="12.62"
            y1="117.48"
            x2="244.62"
            y2="258.81"
          >
            <stop offset="0" stopColor="#00ff5b" />
            <stop offset="1" stopColor="#0014ff" />
          </linearGradient>
          <linearGradient
            id="grd2"
            gradientUnits="userSpaceOnUse"
            x1="40045.29"
            y1="28313"
            x2="100318.89"
            y2="56579"
          >
            <stop offset="0" stopColor="#00ff5b" />
            <stop offset="1" stopColor="#0014ff" />
          </linearGradient>
        </defs>

        <path
          id="Layer"
          className="shp0"
          d="M23.1 178L23.1 228L66.4 253L109.7 278L109.7 278L153 303L196.3 278L196.3 278L196.3 278L196.3 278L239.6 253L282.9 228L282.9 178L239.6 153L196.3 128L196.3 128L153 103L153 153L196.3 178L196.3 178L239.6 203L196.3 228L196.3 228L153 253L153 253L109.7 228L109.7 228L66.4 203L66.4 153L23.1 178L23.1 178Z"
        />
        <path
          id="Layer"
          className="shp1"
          d="M282.9 128L282.9 78L239.6 53L196.3 28L196.3 28L153 3L109.7 28L109.7 28L109.7 28L109.7 28L66.4 53L23.1 78L23.1 128L66.4 153L109.7 178L109.7 178L153 203L153 153L109.7 128L109.7 128L66.4 103L109.7 78L109.7 78L153 53L153 53L196.3 78L196.3 78L239.6 103L239.6 153L282.9 128L282.9 128Z"
        />
      </svg>
    </Box>
  );
}
