import { useState } from 'react';
import { Typography, Box, Tooltip, Paper, Stack, Link, Button } from '@mui/material';
import { BallClipRotateMultiple } from 'react-pure-loaders';
import { Icon } from '@iconify/react';
import { contractAddress } from 'utils/contractAddress';
import { useTheme } from '@mui/material/styles';
import type { NftCardProps } from './NftCard.type';

export default function NftCard({ tokenId, imageUrl, name, nftContract }: NftCardProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
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
      <Box sx={{ p: 1, position: 'relative' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '200px', display: loading ? 'flex' : 'none' }}
        >
          <BallClipRotateMultiple color={'#637381'} loading={loading} />
        </Stack>
        <Link href={`#/assets/polygon/${contractAddress}/${tokenId}`}>
          <Stack
            sx={{ height: '300px' }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              component="img"
              src={imageUrl}
              onLoad={() => setLoading(false)}
              sx={{
                borderRadius: 1.5,
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: loading ? 'none' : 'block'
              }}
            />
          </Stack>
        </Link>
      </Box>

      <Stack spacing={1} sx={{ p: 2, pt: 1, pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/polygon/${contractAddress}/${tokenId}`}
          >
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
          <Button variant="contained" size="small">
            BSC
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/polygon/${contractAddress}/${tokenId}`}
          >
            <Typography variant="subtitle2" noWrap>
              Owner
            </Typography>
          </Link>
          <Typography variant="subtitle2" noWrap>
            0x123456
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/polygon/${contractAddress}/${tokenId}`}
          >
            <Typography variant="subtitle2" noWrap>
              Creator
            </Typography>
          </Link>
          <Typography variant="subtitle2" noWrap>
            0x123456
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Stack sx={{ width: '30%' }} direction="row" alignItems="center">
            <Icon icon="teenyicons:contract-outline" width={16} height={16} />
            <Tooltip title="NFT Contract" sx={{ width: '80%', pl: 0.5 }}>
              <Link
                href={`https://polygonscan.com/address/${nftContract}`}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="body2" noWrap>
                    {nftContract}
                  </Typography>
                </Stack>
              </Link>
            </Tooltip>
          </Stack>
          <Tooltip title="NFT ID">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Icon icon="ant-design:number-outlined" width={16} height={16} />
              <Typography variant="body2" noWrap>
                {tokenId}
              </Typography>
            </Stack>
          </Tooltip>
          <Link
            href={`https://polygonscan.com/token/${nftContract}?a=${tokenId}`}
            underline="none"
            target="_blank"
            rel="noopener"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Icon icon="bi:shield-check" width={16} height={16} />
              <Typography variant="body2" noWrap>
                History
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}
