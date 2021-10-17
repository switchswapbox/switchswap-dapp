// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { OtherQRProps } from 'reduxStore/reducerCustomizeQRCard';

// ----------------------------------------------------------------------

const CreateQRCode = () => {
  const { icon, qrStyleName } = useSelector((state: IRootState) => {
    return {
      icon: state.reducerCustomizeQRCard.icon,
      qrStyleName: state.reducerCustomizeQRCard.qrStyleName || 'qrNormal'
    };
  });
  const otherQRProps = useSelector((state: IRootState) => {
    // eslint-disable-next-line no-lone-blocks
    {
      return state.reducerCustomizeQRCard?.otherQRProps
        ? state.reducerCustomizeQRCard?.otherQRProps[qrStyleName]
        : undefined;
    }
  });

  // eslint-disable-next-line @typescript-eslint/dot-notation
  const { Component } = qrStyles[qrStyleName];
  return (
    <Component
      value="QmaNFdMEfboBAxTy5xxQgvRCYdhDfVqVJHPG1MV3pJtXQH"
      className="my-qrcode"
      styles={{ svg: { width: '300px' } }}
      icon={icon !== '' ? `./static/mock-images/middle-qr-logo/${icon}.png` : ''}
      iconScale={0.2}
      {...otherQRProps}
    />
  );
};
export default function NftCardsDesign({ nftCards }: any) {
  const layoutIndex = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.layout;
  });
  const cardTitle = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.title;
  });
  const SVGComponent = nftCards[layoutIndex || 0];

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      position="sticky"
      top="80px"
    >
      <Box
        sx={{
          zIndex: 0,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          width: '90%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {<SVGComponent qrcode={CreateQRCode()} title={cardTitle} sx={{ width: '100%' }} />}
      </Box>
    </Box>
  );
}
