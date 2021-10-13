import { useFormik, Form, FormikProvider } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Box, Divider, TextField, Typography } from '@mui/material';

import Label from '../../Label';
import ColorSinglePicker from './ColorSinglePicker';
import { useState } from 'react';
import { changeQRCard } from '../../../redux/reducerCustomizeQRCard';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

type MetadataSummaryProps = {
  product: any;
};

export default function MetadataSummary({ product, ...other }: MetadataSummaryProps) {
  const productX = {
    name: 'A cool NFT',

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
    icons: ['Crust', 'Switchswap'],
    layouts: ['svg1', 'svg2', 'svg3', 'svg4']
  };

  const { name, icons, colors, layouts } = productX;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values, { setErrors, setSubmitting }) => {}
  });

  const { getFieldProps, handleSubmit } = formik;
  const dispatch = useDispatch();

  const handleSelectLayout = (event: any) => {
    dispatch(
      changeQRCard({
        layout: event.target.value
      })
    );
  };

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
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Layout
            </Typography>
            <TextField
              select
              size="small"
              {...getFieldProps('layout')}
              SelectProps={{ native: true }}
              onChange={handleSelectLayout}
            >
              {layouts.map((layout: string) => (
                <option key={layout} value={layout}>
                  {layout}
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
              {...getFieldProps('icon')}
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
              {...getFieldProps('icon')}
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
