import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Avatar, Typography, Paper, CardHeader } from '@mui/material';

// components
import Image from './Image';
import Iconify from 'components/Iconify';
import CarouselArrows from './CarouselArrows';

// ----------------------------------------------------------------------
const mock = [
  {
    id: '1',
    name: 'name#1',
    cover: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg'
  },
  {
    id: '2',
    name: 'name#2',
    cover: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg'
  },
  {
    id: '3',
    name: 'name#3',
    cover: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg'
  },
  {
    id: '4',
    name: 'name#2',
    cover: ''
  },
  {
    id: '3',
    name: 'name#3',
    cover: ''
  }
];

export default function BookingNewestBooking() {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
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
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {/* {mock.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))} */}
        <BookingItem key={'1'} item={mock[0]} />
        <BookingItem key={'2'} item={mock[1]} />
        <Box />
        <Box />
        <Box />
      </Slider>
    </Box>
  );
}

// ----------------------------------------------------------------------

type BookingItemProps = {
  id: string;
  name: string;
  cover: string;
};

function BookingItem({ item }: { item: BookingItemProps }) {
  const { name, cover } = item;

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <div>
            <Typography variant="subtitle2">{name}</Typography>
          </div>
        </Stack>
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Image src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
    </Paper>
  );
}
