import Avatar, { Props as AvatarProps } from './Avatar';

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = {
    photoURL: 'https://public.nftstatic.com/static/nft/res/9d485f854817469ba14252ee500e6afa.png',
    displayName: 'Name'
  };
  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : 'info'}
      {...other}
    >
      TN
    </Avatar>
  );
}
