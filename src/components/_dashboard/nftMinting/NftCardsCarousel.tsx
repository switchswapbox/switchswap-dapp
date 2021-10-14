// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import { QRNormal } from 'react-qrbtf';
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
  return (
    <QRNormal
      value="QmaNFdMEfboBAxTy5xxQgvRCYdhDfVqVJHPG1MV3pJtXQH5465465465465465465465465465"
      className="my-qrcode"
      styles={{ svg: { width: '300px' } }}
      type="round"
      size={50}
      opacity={70}
      posType="planet"
      otherColor="#33CCCC"
      posColor="#009999"
    />
  );
};
export default function NftCardsCarousel({ nftCards }: any) {
  const svgType = useSelector((state: IRootState) => {
    return state.qrCardReducer.layout;
  });
  const cardTitle = useSelector((state: IRootState) => {
    return state.qrCardReducer.title;
  });
  const SVGComponent = nftCards[svgType || 'svg1'];

  return (
    <RootStyle>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {<SVGComponent qrcode={CreateQRCode()} title={cardTitle} others={{ height: '300px' }} />}
        </Box>
      </Box>
    </RootStyle>
  );
}
