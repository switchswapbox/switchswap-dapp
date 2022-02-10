import Slider from 'react-slick';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, CardHeader, useMediaQuery } from '@mui/material';

import CarouselArrows from './CarouselArrows';
import NftCard from 'components/gallery/NftCard';

const mock = [
  {
    tokenId: '1',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/415278e5c62e4bdca1c608f967db8513.gif',
    name: 'Name#1',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '2',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/5ca1d828ada44bfdbbe610b1ef5524c5.png',
    name: 'Name#2',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '3',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/1451e60556704027a42ee72da6d6a11c.png',
    name: 'Name#3',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '4',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/57d22e253a784219a9f3b6eaafdd2f4a.gif',
    name: 'Name#1',
    nftContract: '0x1234',
    owner: '0x1423432'
  },
  {
    tokenId: '5',
    imageUrl: 'https://public.nftstatic.com/static/nft/res/a85ad35627c4468f9e8b48de2bf9ba1a.png',
    name: 'Name#1',
    nftContract: '0x1234',
    owner: '0x1423432'
  }
];

export default function MyCollections() {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);

  const [numberOfFrames, setNumberOfFrames] = useState(4);
  const fourFrames = useMediaQuery(theme.breakpoints.up(800));
  const threeFrames = useMediaQuery(theme.breakpoints.up(600));
  const twoFrames = useMediaQuery(theme.breakpoints.up(400));

  useEffect(() => {
    setNumberOfFrames(fourFrames ? 4 : threeFrames ? 3 : twoFrames ? 2 : 1);
  }, [fourFrames, threeFrames, twoFrames]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box>
      <CardHeader
        title="Collection #1"
        subheader="45 NFTs"
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mt: 5,
          mb: 1,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {mock.map((item) => (
          <Box key={item.tokenId}>
            <NftCard {...item} />
          </Box>
        ))}

        {[...Array(numberOfFrames - mock.length < 0 ? 0 : numberOfFrames - mock.length)].map(
          (_, index) => (
            <Box key={index} />
          )
        )}
      </Slider>
    </Box>
  );
}
