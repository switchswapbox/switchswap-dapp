import { styled } from '@mui/material/styles';
import Identicons from '@nimiq/identicons';
import Image from './Image';
import MyAvatar from './MyAvatar';

Identicons.svgPath = './static/identicons.min.svg';

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

export type ProfileCoverProps = {
  coverUrl: string;
  avatarUrl: string;
};

export default function ProfileCover({ coverUrl, avatarUrl }: ProfileCoverProps) {
  const dataUrl = Identicons.placeholderToDataUrl('#fff', 2);
  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          avatarUrl={dataUrl}
          sx={{
            mx: 'auto',
            // borderWidth: 5,
            // borderStyle: 'solid',
            // borderColor: 'common.white',
            width: 130,
            height: 130
          }}
        />
      </InfoStyle>
      <InfoStyle>
        <MyAvatar
          avatarUrl={avatarUrl}
          sx={{
            mx: 'auto',
            // borderWidth: 5,
            // borderStyle: 'solid',
            // borderColor: 'common.white',
            width: 128,
            height: 128
          }}
        />
      </InfoStyle>
      <Image
        alt="profile cover"
        src={coverUrl}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 2 }}
      />
    </RootStyle>
  );
}
