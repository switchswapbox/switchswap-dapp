import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { CarouselControlsPaging1 } from '../../../components/carousel';
import useLocales from '../../../hooks/useLocales';

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
        <Button
          key="learn-more"
          to={PATH_DASHBOARD.about.learnMore}
          component={RouterLink}
          variant="contained"
        >
          {translate(`general.learnMore`)}
        </Button>
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
