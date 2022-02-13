import { styled } from '@mui/material/styles';
import MyAvatar from './MyAvatar';
import Image from './Image';

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    // ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  top: 216,
  zIndex: 99,
  position: 'absolute'
}));

export default function ProfileCover() {
  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: 128,
            height: 128
          }}
        />
      </InfoStyle>
      <Image
        alt="profile cover"
        src="https://public.nftstatic.com/static/nft/res/d06f4b2332c740658c1f081b2b74ed4b.png"
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 2 }}
      />
    </RootStyle>
  );
}
