import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Tooltip, Divider, Typography, IconButton } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../../utils/formatNumber';
// @types
//
import { AssetAndOwnerType } from '../../../pages/AssetViewer';

import SvgIconStyle from '../../SvgIconStyle';
import Identicons from '@nimiq/identicons';

Identicons.svgPath = './static/identicons.min.svg';

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
          src="/static/icons/shape-avatar.svg"
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
        Address
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        Polygon
      </Typography>

      <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>

      <Divider />

      <Grid container sx={{ py: 3 }}>
        {InfoItem('Total Minted NFT', assetAndOwner.balance)}
        {InfoItem('Total rocket', '0')}
      </Grid>
    </Card>
  );
}
