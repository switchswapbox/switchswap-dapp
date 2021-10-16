// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import {
  QRNormal,
  QR25D,
  QRDsj,
  QRRandRect,
  QRImage,
  QRResImage,
  QRBubble,
  QRFunc,
  QRLine
} from 'react-qrbtf';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

// ----------------------------------------------------------------------

const CreateQRCode = () => {
  const icon = useSelector((state: IRootState) => {
    return state.qrCardReducer.icon;
  });
  return (
    // <QRNormal
    //   value="QmaNFdMEfboBAxTy5xxQgvRCYdhDfVqVJHPG1MV3pJtXQH5465465465465465465465465465"
    //   className="my-qrcode"
    //   styles={{ svg: { width: '300px' } }}
    //   type="round"
    //   size={50}
    //   opacity={70}
    //   posType="planet"
    //   otherColor="#33CCCC"
    //   posColor="#009999"
    // />
    <QRNormal
      value="QmaNFdMEfboBAxTy5xxQgvRCYdhDfVqVJHPG1MV3pJtXQH"
      className="my-qrcode"
      styles={{ svg: { width: '300px' } }}
      icon={icon !== '' ? `./static/mock-images/middle-qr-logo/${icon}.png` : ''}
      otherColor="#33CCCC"
      posColor="#009999"
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
