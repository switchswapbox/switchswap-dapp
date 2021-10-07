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
    name: 'Nike Air Force 1 NDESTRUKT',

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
    icons: ['Crust', 'Switchswap']
  };

  const { name, icons, colors } = productX;

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
              {icons.map((icon: string) => (
                <option key={icon} value={icon}>
                  {icon}
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
              {icons.map((icon: string) => (
                <option key={icon} value={icon}>
                  {icon}
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
