import { useState } from 'react';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Popover, Typography } from '@mui/material';
// utils

import { CarouselControlsPaging1 } from '../../carousel';
import useLocales from '../../../hooks/useLocales';
// ----------------------------------------------------------------------

const NFT = [
  { id: '1', name: 'File identity paper', image: './static/sample-nft/simplified/07.jpg' },
  {
    id: '2',
    name: 'NFT with author registration',
    image: './static/sample-nft/withAuthorReg/02.jpg'
  },
  { id: '3', name: 'Simple file card', image: './static/sample-nft/simplified/01.png' }
];

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: '100%'
  }
}));

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    image: string;
    name: string;
  };
};

function CarouselItem({ item }: CarouselItemProps) {
  const { image, name } = item;
  const { translate } = useLocales();
  const [click, setCLick] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCLick(event.currentTarget);
  };
  const handleClose = () => {
    setCLick(null);
  };

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
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: '80%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        {/* <Button to="#" variant="contained" component={RouterLink}>
          Learn More
        </Button> */}
        <Button variant="contained" onClick={handleClick}>
          {translate(`general.learnMore`)}
        </Button>
        <Popover
          open={Boolean(click)}
          anchorEl={click}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              We are working hard on this page. Stay tuned!
            </Typography>
          </Box>
        </Popover>
      </CardContent>
    </Box>
  );
}

export default function NftPresentation() {
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
