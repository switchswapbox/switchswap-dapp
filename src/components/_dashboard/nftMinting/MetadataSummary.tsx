// material
import { styled } from '@mui/material/styles';
import { Divider, Switch, Theme } from '@mui/material';
import Label from '../../Label';
import React, { ReactElement, useState } from 'react';
import { SxProps } from '@mui/system/styleFunctionSx';
import MidIconSelection from './qrCardCustomize/MidIconSelection';
import QRStyleSelection from './qrCardCustomize/QRStyleSelection';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { initialMintingProcessState } from 'reduxStore/reducerMintingProcess';
import { changeQRCardGeneralInfo, initialQRCard } from 'reduxStore/reducerCustomizeQRCard';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

type MetadataSummaryProps = {
  children: ReactElement;
  sx?: SxProps<Theme> | undefined;
};

const MetadataSummary = ({ children, ...other }: MetadataSummaryProps) => {
  const { nftType, changeQRFile } = useSelector((state: IRootState) => {
    return {
      nftType: (state.reducerMintingProcess.nftType ||
        initialMintingProcessState.nftType) as string,
      changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
    };
  });
  const dispatch = useDispatch();
  return (
    <RootStyle {...other}>
      <>
        {nftType === 'withAuthorReg' ? (
          <>
            <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 5 }}>
              {changeQRFile ? 'FILE QR CODE' : 'AUTHOR REGISTER'}
            </Label>
            <Switch
              edge="end"
              checked={changeQRFile}
              onChange={() => dispatch(changeQRCardGeneralInfo({ changeQRFile: !changeQRFile }))}
            />
          </>
        ) : (
          <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 5 }}>
            FILE QR CODE
          </Label>
        )}

        <QRStyleSelection />
        <MidIconSelection />
        <Divider sx={{ my: 5 }} />
        {children}
      </>
    </RootStyle>
  );
};

export default MetadataSummary;
