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
      value="QmaNFdMEfboBAxTy5xxQgvRCYdhDfVqVJHPG1MV3pJtXQH"
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
  const SVGComponent = nftCards[svgType];

  return (
    <RootStyle>
      <Box>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {<SVGComponent qrcode={CreateQRCode()} others={{ height: '400px' }} />}
        </Box>
      </Box>
    </RootStyle>
  );
}
