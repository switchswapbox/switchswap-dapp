// material
import { Grid, Stack } from '@mui/material';
// @types
import { Profile as UserProfile, UserPost } from '../../../@types/user';
//
import AssetDetails from './AssetDetails';
import AssetCard from './AssetCard';
import AboutOwner from './AboutOwner';
// import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type ProfileProps = {
  assetOwnerProfile: UserProfile;
  asset: UserPost[];
  ownerIcon: string;
};

export default function Asset({ assetOwnerProfile, asset, ownerIcon }: ProfileProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <AboutOwner ownerIcon={ownerIcon} />
          <AssetDetails profile={assetOwnerProfile} />
          {/* <ProfileSocialInfo profile={myProfile} /> */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {asset.map((asset) => (
            <AssetCard key={asset.id} post={asset} ownerIcon={ownerIcon} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
