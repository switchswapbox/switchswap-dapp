import Slider from 'react-slick';

// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

import { CarouselControlsPaging1 } from '../../../components/carousel';

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  objectFit: 'cover'
}));

type CarouselItemProps = {
  item: {
    image: string;
    name: string;
  };
};

type NftProps = {
  NFT: {
    name: string;
    image: string;
  }[];
};

function CarouselItem({ item }: CarouselItemProps) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselImgStyle alt={name} src={image} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          bgcolor: 'transparent'
        }}
      />
    </Box>
  );
}

export default function DemoNft({ NFT }: NftProps) {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging1({ color: 'primary.main' })
  };

  return (
    <Card>
      <Slider {...settings}>
        {NFT.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
