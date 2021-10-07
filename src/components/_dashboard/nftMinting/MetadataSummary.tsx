import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { useFormik, Form, FormikProvider, useField } from 'formik';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Link,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import { MIconButton } from '../../@material-extend';
import ColorSinglePicker from './ColorSinglePicker';
import { Product, CartItem } from './products';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

const Incrementer = ({ name, available }: { name: string; available: number }) => {
  const [field, , helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

type MetadataSummaryProps = {
  product: any;
};

export default function MetadataSummary({ product, ...other }: MetadataSummaryProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  // const name = 'Ni ke';
  // const price = 15.2;
  // const status =
  // const colors = [
  //   '#00AB55',
  //   '#000000',
  //   '#FFFFFF',
  //   '#FFC0CB',
  //   '#FF4842',
  //   '#1890FF',
  //   '#94D82D',
  //   '#FFC107'
  // ];

  const productX = {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    cover: '/static/mock-images/products/product_1.jpg',
    images: [
      '/static/mock-images/products/product_1.jpg',
      '/static/mock-images/products/product_2.jpg',
      '/static/mock-images/products/product_3.jpg',
      '/static/mock-images/products/product_4.jpg',
      '/static/mock-images/products/product_5.jpg',
      '/static/mock-images/products/product_6.jpg',
      '/static/mock-images/products/product_7.jpg',
      '/static/mock-images/products/product_8.jpg'
    ],
    name: 'Nike Air Force 1 NDESTRUKT',
    code: '38BEE270',
    sku: 'WW75K5210YW/SV',
    tags: ['Dangal', 'The Sting', '2001: A Space Odyssey', "Singin' in the Rain"],
    price: 16.19,
    priceSale: 16.19,
    totalRating: 2.5,
    totalReview: 7651,
    ratings: [
      {
        name: '1 Star',
        starCount: 4162,
        reviewCount: 3317
      },
      {
        name: '2 Star',
        starCount: 2883,
        reviewCount: 1253
      },
      {
        name: '3 Star',
        starCount: 4649,
        reviewCount: 5219
      },
      {
        name: '4 Star',
        starCount: 1239,
        reviewCount: 8505
      },
      {
        name: '5 Star',
        starCount: 6214,
        reviewCount: 5413
      }
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        avatarUrl: '/static/mock-images/avatars/avatar_1.jpg',
        comment: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
        rating: 2.5,
        isPurchased: true,
        helpful: 4375,
        postedAt: '2021-10-07T21:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        avatarUrl: '/static/mock-images/avatars/avatar_2.jpg',
        comment: 'Quis veniam aut saepe aliquid nulla.',
        rating: 2,
        isPurchased: true,
        helpful: 6666,
        postedAt: '2021-10-06T20:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
        comment: 'Reprehenderit ut voluptas sapiente ratione nostrum est.',
        rating: 4.9,
        isPurchased: true,
        helpful: 3527,
        postedAt: '2021-10-05T19:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        avatarUrl: '/static/mock-images/avatars/avatar_4.jpg',
        comment: 'Error ut sit vel molestias velit.',
        rating: 2,
        isPurchased: false,
        helpful: 1160,
        postedAt: '2021-10-04T18:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        avatarUrl: '/static/mock-images/avatars/avatar_5.jpg',
        comment: 'Quo quia sit nihil nemo doloremque et.',
        rating: 4,
        isPurchased: false,
        helpful: 7799,
        postedAt: '2021-10-03T17:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        avatarUrl: '/static/mock-images/avatars/avatar_6.jpg',
        comment: 'Autem doloribus harum vero laborum.',
        rating: 5,
        isPurchased: true,
        helpful: 2623,
        postedAt: '2021-10-02T16:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        avatarUrl: '/static/mock-images/avatars/avatar_7.jpg',
        comment: 'Tempora officiis consequuntur architecto nostrum autem nam adipisci.',
        rating: 4.9,
        isPurchased: false,
        helpful: 2380,
        postedAt: '2021-10-01T15:42:28.530Z'
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        avatarUrl: '/static/mock-images/avatars/avatar_8.jpg',
        comment: 'Voluptas sunt magni adipisci praesentium saepe.',
        rating: 5,
        isPurchased: false,
        helpful: 3798,
        postedAt: '2021-09-30T14:42:28.530Z'
      }
    ],
    colors: [
      '#00AB55',
      '#000000',
      '#FFFFFF',
      '#FFC0CB',
      '#FF4842',
      '#1890FF',
      '#94D82D',
      '#FFC107'
    ],
    status: 'sale',
    inventoryType: 'in_stock',
    sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    available: 52,
    description:
      '\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n',
    sold: 919,
    createdAt: '2021-10-07T21:42:28.530Z',
    category: 'Accessories',
    gender: 'Men'
  };

  const {
    name,
    sizes,
    price,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType
  } = productX;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values, { setErrors, setSubmitting }) => {}
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <RootStyle {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h5" paragraph>
            {name}
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            Description
          </Typography>

          <TextField
            rows={3}
            fullWidth
            variant="standard"
            multiline
            autoFocus
            size="small"
            placeholder="Enter what is so cool about my NFT"
            type="string"
          />

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 2 }}>
            FILE QR CODE
          </Label>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              QR Code Style
            </Typography>
            <ColorSinglePicker
              {...getFieldProps('color')}
              colors={colors}
              sx={{
                ...(colors.length > 4 && {
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                })
              }}
            />
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Middle Icon
            </Typography>
            <TextField
              select
              size="small"
              {...getFieldProps('size')}
              SelectProps={{ native: true }}
            >
              {sizes.map((size: string) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              my: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Anchor Point Color
            </Typography>
            <ColorSinglePicker
              {...getFieldProps('color')}
              colors={colors}
              sx={{
                ...(colors.length > 4 && {
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                })
              }}
            />
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Middle Icon
            </Typography>
            <TextField
              select
              size="small"
              {...getFieldProps('size')}
              SelectProps={{ native: true }}
            >
              {sizes.map((size: string) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </TextField>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 2 }}>
            AUTHOR QR CODE
          </Label>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
