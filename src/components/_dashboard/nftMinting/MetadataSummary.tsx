// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Pagination, Theme, Typography } from '@mui/material';

import Label from '../../Label';
import {
  changeQRCardGeneralInfo,
  qrStyleNameType
} from '../../../reduxStore/reducerCustomizeQRCard';
import { useDispatch } from 'react-redux';
import React, { ReactElement } from 'react';
import { SxProps } from '@mui/system/styleFunctionSx';
import qrStyles from './qrCardCustomize';
import MidIconSelection from './qrCardCustomize/MidIconSelection';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

type MetadataSummaryProps = {
  children: ReactElement;
  sx?: SxProps<Theme> | undefined;
};

const MetadataSummary = ({ children, ...other }: MetadataSummaryProps) => {
  const qrStylesList = Object.keys(qrStyles);
  const dispatch = useDispatch();

  const handleSelectQRStyle = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value) {
      dispatch(
        changeQRCardGeneralInfo({
          qrStyleName: qrStylesList[value - 1] as qrStyleNameType
        })
      );
    }
  };

  return (
    <RootStyle {...other}>
      <>
        <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 5 }}>
          FILE QR CODE
        </Label>

        <Box
          sx={{
            my: 2,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            QR Code Style
          </Typography>
          <Pagination
            count={qrStylesList.length}
            siblingCount={0}
            color="primary"
            onChange={handleSelectQRStyle}
          />
        </Box>
        <MidIconSelection />
        <Divider sx={{ my: 5 }} />
        {children}
      </>
    </RootStyle>
  );
};

export default MetadataSummary;
