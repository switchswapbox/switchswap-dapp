import Avatar, { Props as AvatarProps } from './Avatar';

interface CollectionAvatarProps extends AvatarProps {
  avatarUrl: string;
}

export default function MyAvatar({ avatarUrl, ...other }: CollectionAvatarProps) {
  const user = {
    photoURL: 'https://public.nftstatic.com/static/nft/res/9d485f854817469ba14252ee500e6afa.png',
    displayName: 'Name'
  };
  return (
    <Avatar
      src={avatarUrl}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : 'info'}
      {...other}
    >
      {user?.displayName}
    </Avatar>
  );
}
