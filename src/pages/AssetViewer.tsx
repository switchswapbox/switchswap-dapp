// material
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';
import { Block } from 'components/Block';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// ----------------------------------------------------------------------

export default function LearnMore() {
  const { themeStretch } = useSettings();
  const { network, contract, tokenId } = useParams();
  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {network}
        {contract} {tokenId}
        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ height: '800px' }}>
            <Card sx={{ overflow: 'unset', position: 'unset', width: '100%', height: '500px' }}>
              {' '}
              Hello
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ display: 'flex', width: '100%' }} elevation={2}>
                  <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          Play audio if the NFT is audio
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Mac Miller
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                          <SkipPreviousIcon />
                        </IconButton>
                        <IconButton aria-label="play/pause">
                          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                          <SkipNextIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image="https://static8.depositphotos.com/1052036/848/v/600/depositphotos_8480205-stock-illustration-music-doodle.jpg"
                      alt="Live from space album cover"
                    />
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2}>Hello</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
