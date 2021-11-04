import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import useLocales from '../../../../hooks/useLocales';

const ContactCard = (): JSX.Element => {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box component={Card} boxShadow={0} border={`1px solid ${theme.palette.divider}`}>
      <Box padding={{ xs: 2, sm: 3 }}>
        <Typography
          sx={{
            fontWeight: '700'
          }}
          gutterBottom
        >
          {translate(`term.contact`)}
        </Typography>
        <Typography
          variant={'body2'}
          color={'text.secondary'}
          sx={{
            marginBottom: 2
          }}
        >
          {translate(`term.contact us`)}
        </Typography>
        <Typography variant={'subtitle2'}>hi@switchswap.io</Typography>
      </Box>
    </Box>
  );
};

export default ContactCard;
