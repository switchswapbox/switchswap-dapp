// material
import { Grid, Stack } from '@mui/material';
//
import AssetDetails from './AssetDetails';
import AssetCard from './AssetCard';
import AboutOwner from './AboutOwner';
// import ProfileSocialInfo from './ProfileSocialInfo';
import { AssetAndOwnerType } from '../../../pages/AssetViewer';
// ----------------------------------------------------------------------

export default function Asset({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  console.log(assetAndOwner);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <AboutOwner assetAndOwner={assetAndOwner} />
          <AssetDetails assetAndOwner={assetAndOwner} />
          {/* <ProfileSocialInfo profile={myProfile} /> */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AssetCard assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>
    </Grid>
  );
}
