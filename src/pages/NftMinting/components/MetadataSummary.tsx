import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Tab, Tabs, Theme } from '@mui/material';
import Label from '../../../components/Label';
import { SxProps } from '@mui/system/styleFunctionSx';
import MidIconSelection from './qrCardCustomize/MidIconSelection';
import QRStyleSelection from './qrCardCustomize/QRStyleSelection';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { initialMintingProcessState } from '../../../redux/reducerMintingProcess';
import { changeQRCardGeneralInfo } from '../../../redux/reducerCustomizeQRCard';

const RootStyle = styled('div')(({ theme }) => ({}));

type MetadataSummaryProps = {
  children: ReactElement;
  sx?: SxProps<Theme> | undefined;
};

const MetadataSummary = ({ children, ...other }: MetadataSummaryProps) => {
  const { nftType, changeQRFile } = useAppSelector((state) => ({
    nftType: (state.reducerMintingProcess.nftType || initialMintingProcessState.nftType) as string,
    changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
  }));
  const dispatch = useAppDispatch();
  return (
    <RootStyle {...other}>
      <>
        {nftType === 'withAuthorReg' ? (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 5 }}>
              <Tabs
                value={changeQRFile ? 0 : 1}
                onChange={() => dispatch(changeQRCardGeneralInfo({ changeQRFile: !changeQRFile }))}
                indicatorColor="secondary"
              >
                <Tab label="FILE QR CODE" />
                <Tab label="AUTHOR REGISTER" />
              </Tabs>
            </Box>
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
