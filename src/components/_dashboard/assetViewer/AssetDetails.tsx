import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Typography,
  CardHeader,
  Stack,
  ButtonBase,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';
// @types
import { Profile } from '../../../@types/user';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

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

export default function AssetDetails({ profile }: { profile: Profile }) {
  const { quote, country, email, role, company, school } = profile;

  return (
    <Card>
      <CardHeader title="Asset Details" />

      <Stack spacing={1} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Contract Address</Typography>
          <ButtonBase>
            <Typography variant="body2">0xF123456</Typography>
          </ButtonBase>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Token ID</Typography>
          <ButtonBase>
            <Typography variant="body2">123</Typography>
          </ButtonBase>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Token Standard</Typography>
          <Typography variant="body2">ERC721</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Network</Typography>
          <Typography variant="body2">Polygon</Typography>
        </Stack>
      </Stack>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>
    </Card>
  );
}
