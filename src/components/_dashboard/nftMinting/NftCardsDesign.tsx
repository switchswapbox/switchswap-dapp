// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

// ----------------------------------------------------------------------

const CreateQRCode = () => {
  const { icon, qrStyleName } = useSelector((state: IRootState) => {
    return {
      icon: state.qrCardReducer.icon,
      qrStyleName: state.qrCardReducer.qrStyleName || 'qrNormal'
    };
  });
  const otherQRProps = useSelector((state: IRootState) => {
    return state.qrCardReducer.otherQRProps[qrStyleName];
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
    return state.qrCardReducer.layout;
  });
  const cardTitle = useSelector((state: IRootState) => {
    return state.qrCardReducer.title;
  });
  const SVGComponent = nftCards[layoutIndex || 0];

  return (
    <RootStyle>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    </RootStyle>
  );
}
