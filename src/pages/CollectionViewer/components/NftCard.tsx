import { useEffect, useState } from 'react';
import { Typography, Box, Paper, Stack, Link } from '@mui/material';
import { BallClipRotateMultiple } from 'react-pure-loaders';
import { Icon } from '@iconify/react';
import { contractAddress } from 'utils/contractAddress';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import type { NftCardCollectionViewerProps } from '../CollectionViewer.types';

// To be moved to its place
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#EAECEF'),
  backgroundColor: '#EAECEF',
  '&:hover': {
    backgroundColor: '#EAECEF'
  },
  boxShadow: 'none',
  padding: '3px 8px',
  minWidth: 0,
  borderRadius: '3px'
}));

export default function NftCard({ tokenId, imageUrl, name, owner }: NftCardCollectionViewerProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [imageUrl]);
  return (
    <Paper
      sx={{
        borderRadius: 2,
        bgcolor: 'transparent',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 4)})`,
          boxShadow: (theme) => theme.shadows['4']
        }
      }}
    >
      <Box sx={{ p: 2, position: 'relative' }}>
        <Link href={`#/assets/polygon/${contractAddress}/${tokenId}`}>
          <Box sx={{ border: 1, borderRadius: '5px', borderColor: '#DFE3E8' }}>
            <Stack
              sx={{
                paddingTop: '100%',
                position: 'relative'
              }}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  display: loading ? 'flex' : 'none',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%'
                }}
              >
                <BallClipRotateMultiple color={'#637381'} loading={loading} />
              </Stack>
              <Box
                component="img"
                src={imageUrl}
                onLoad={() => setLoading(false)}
                sx={{
                  top: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: loading ? 'none' : 'block',
                  position: 'absolute',
                  borderRadius: '5px'
                }}
              />
            </Stack>
          </Box>
        </Link>
      </Box>

      <Stack spacing={0.5} sx={{ p: 2, pt: 1, pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/polygon/${contractAddress}/${tokenId}`}
            sx={{ maxWidth: '70%' }}
          >
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
          <ColorButton
            variant="contained"
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
          >
            <Typography variant="caption" noWrap>
              Polygon
            </Typography>
          </ColorButton>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/polygon/${contractAddress}/${tokenId}`}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="caption" noWrap>
                Owner
              </Typography>
              <Icon icon="healthicons:miner-worker-outline" width={18} height={18} />
            </Stack>
          </Link>

          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            {owner || ''}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/polygon/${contractAddress}/${tokenId}`}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="caption" noWrap>
                Token ID
              </Typography>
            </Stack>
          </Link>

          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            #{tokenId || ''}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
