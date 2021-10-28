// material
import { styled } from '@mui/material/styles';
import { Divider, Theme } from '@mui/material';
import Label from '../../Label';
import React, { ReactElement } from 'react';
import { SxProps } from '@mui/system/styleFunctionSx';
import MidIconSelection from './qrCardCustomize/MidIconSelection';
import QRStyleSelection from './qrCardCustomize/QRStyleSelection';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

type MetadataSummaryProps = {
  children: ReactElement;
  sx?: SxProps<Theme> | undefined;
};

const MetadataSummary = ({ children, ...other }: MetadataSummaryProps) => {
  return (
    <RootStyle {...other}>
      <>
        <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 5 }}>
          FILE QR CODE
        </Label>

        <QRStyleSelection />
        <MidIconSelection />
        <Divider sx={{ my: 5 }} />
        {children}
      </>
    </RootStyle>
  );
};

export default MetadataSummary;
