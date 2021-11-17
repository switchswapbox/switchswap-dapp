// material
import { Grid, Stack } from '@mui/material';
//
import AssetDetails from './AssetDetails';
import AssetCard from './AssetCard';
import AboutOwner from './AboutOwner';
// import ProfileSocialInfo from './ProfileSocialInfo';
import { AssetAndOwnerType } from '../AssetViewer.types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilesInfo from './FilesInfo';
// ----------------------------------------------------------------------

export default function Asset({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const biggerThanMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AssetCard assetAndOwner={assetAndOwner} />
          <FilesInfo assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <AboutOwner assetAndOwner={assetAndOwner} />
          <AssetDetails assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>
    </Grid>
  );
}
