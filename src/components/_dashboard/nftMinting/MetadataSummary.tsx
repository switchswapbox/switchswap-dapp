import { useFormik, Form, FormikProvider } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Pagination, TextField, Theme, Typography } from '@mui/material';

import Label from '../../Label';
import ColorSinglePicker from './ColorSinglePicker';
import { changeQRCard } from '../../../reduxStore/reducerCustomizeQRCard';
import { useDispatch } from 'react-redux';
import React from 'react';
import svgArray from 'utils/svg-data';
import { SxProps } from '@mui/system/styleFunctionSx';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

type MetadataSummaryProps = {
  product: any;
  sx?: SxProps<Theme> | undefined;
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
    layouts: Array.from(Array(svgArray.length).keys())
  };

  const { name, icons, colors, layouts } = productX;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values, { setErrors, setSubmitting }) => {}
  });

  const { getFieldProps, handleSubmit } = formik;
  const dispatch = useDispatch();

  const handleSelectLayout = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      changeQRCard({
        layout: value - 1
      })
    );
  };

  return (
    <RootStyle {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mt: 5 }}>
            FILE QR CODE
          </Label>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              pt: 2
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Layout
            </Typography>
            <Pagination count={svgArray.length} color="primary" onChange={handleSelectLayout} />
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
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
