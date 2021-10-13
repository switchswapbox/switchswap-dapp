import Slider from 'react-slick';
import { findIndex } from 'lodash';
import { useState, useRef, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
//
import LightboxModal from './LightboxModal';
import { CarouselControlsArrowsIndex } from '../../carousel';
import { QRNormal } from 'react-qrbtf';
import { ArgsProps } from '../../../utils/svg-data/svgArgs';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: THUMB_SIZE,
  overflow: 'hidden',
  height: THUMB_SIZE,
  position: 'relative',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity')
  },
  '& .isActive': {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 3px ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.grey[900], 0.48)
  }
}));

const LargeImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

// ----------------------------------------------------------------------

type LargeItemProps = {
  item: string;
  onOpenLightbox: (value: string) => void;
};

function LargeItem({ item, onOpenLightbox }: LargeItemProps) {
  return (
    <Box sx={{ cursor: 'zoom-in', paddingTop: '60.42%', position: 'relative' }}>
      <LargeImgStyle alt="large image" src={item} onClick={() => onOpenLightbox(item)} />
    </Box>
  );
}

function ThumbnailItem({ item }: { item: string }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <ThumbImgStyle alt="thumb image" src={item} />
    </ThumbWrapperStyle>
  );
}

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
  const svgType = useSelector((state: any) => {
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
