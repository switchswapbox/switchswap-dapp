import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export default function Introduction() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
  return (
    <Box
      sx={{
        position: 'relative',
        '&::after': {
          position: 'absolute',
          content: '""',
          width: '20%',
          zIndex: 1,
          top: 0,
          left: 0,
          height: '100%',
          backgroundSize: '18px 18px',
          backgroundImage: `radial-gradient(${alpha(
            theme.palette.primary.dark,
            0.4
          )} 20%, transparent 20%)`,
          opacity: 0.2
        },
        mb: 5
      }}
    >
      <Box position={'relative'} zIndex={2}>
        <Box marginBottom={2}>
          <Typography
            variant="h3"
            color="text.primary"
            align={'center'}
            sx={{
              fontWeight: 700
            }}
          >
            Create your own collection like a pro
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
            align={'center'}
          >
            With CrustNFTs, you write the smart contract for your NFTs collection and deploy it on
            blockchain in minutes.
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'center' }}
          justifyContent={'center'}
        >
          <Button
            component={'a'}
            variant="contained"
            size="large"
            fullWidth={isMd ? false : true}
            href={'/'}
            target={'_blank'}
            color="info"
            sx={{ backgroundColor: '#377dff' }}
          >
            Case studies
          </Button>
          <Box
            marginTop={{ xs: 2, sm: 0 }}
            marginLeft={{ sm: 2 }}
            width={{ xs: '100%', md: 'auto' }}
          >
            <Button
              component={'a'}
              href={'/'}
              variant="outlined"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
            >
              View documentation
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
