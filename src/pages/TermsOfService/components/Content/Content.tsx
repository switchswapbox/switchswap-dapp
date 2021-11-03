import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useLocales from 'hooks/useLocales';
const mock = [
  {
    title: 'INTRODUCTION',
    description: 'Welcome'
  },
  {
    title: '',
    description: 'This Terms'
  },
  {
    title: 'NOTICE',
    description: ''
  },
  {
    title: '1. Modification',
    description: 'We reserve1'
  },
  {
    title: '2. Eligibility',
    description: 'To access'
  },
  {
    title: '3. Proprietary Rights',
    description: 'We own'
  },
  {
    title: '4. Additional Rights.',
    description: 'We reserve2'
  },
  {
    title: '5. Privacy',
    description: 'We care'
  },
  {
    title: '',
    description: 'Additionally'
  }
];

const PrivacySection = ({ title, description }: { title: string; description: string }) => {
  const { translate } = useLocales();
  return (
    <Box>
      <Typography
        variant={'h6'}
        gutterBottom
        sx={{
          fontWeight: 'medium'
        }}
      >
        {translate(`term.${title}`)}
      </Typography>
      <Typography component={'p'} color={'text.secondary'}>
        {translate(`term.${description}`)}
      </Typography>
    </Box>
  );
};

const Content = (): JSX.Element => {
  return (
    <Box>
      {mock.map((item, i) => (
        <Box key={i} marginBottom={i < mock.length - 1 ? 4 : 0}>
          <PrivacySection {...item} />
        </Box>
      ))}
    </Box>
  );
};

export default Content;
