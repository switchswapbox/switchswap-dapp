import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Tooltip, Divider, Typography, IconButton } from '@mui/material';

import { AssetAndOwnerType } from '../AssetViewer.types';

import SvgIconStyle from '../../../components/SvgIconStyle';
import Identicons from '@nimiq/identicons';
import { shortenAddress } from 'utils/formatAddress';

Identicons.svgPath = './static/identicons.min.svg';

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 5 / 16)',
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

function InfoItem(name: string, number: string) {
  return (
    <Grid item xs={6} sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
        {name}
      </Typography>
      <Typography variant="subtitle1">{number}</Typography>
    </Grid>
  );
}

export default function UserCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  return (
    <Card>
      <CardMediaStyle>
        <SvgIconStyle
          color="paper"
          src="./static/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            bottom: -26,
            position: 'absolute'
          }}
        />
        <Avatar
          alt="Hello"
          src={assetAndOwner.ownerIcon}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        />
        <CoverImgStyle alt="cover" src={assetAndOwner.ownerIcon} />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {shortenAddress(assetAndOwner.ownerAddress, 5)}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        Polygon
      </Typography>

      <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>
        <Tooltip title="PolygonScan">
          <IconButton
            href={`https://polygonscan.com/address/${assetAndOwner.ownerAddress}`}
            target="_blank"
          >
            <Box component="img" src="./static/icons/shared/polygon.svg" sx={{ height: 24 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      <Grid container sx={{ py: 3 }}>
        {InfoItem('Total Minted NFT', assetAndOwner.balance)}
        {InfoItem('Total rocket', '0')}
      </Grid>
    </Card>
  );
}
