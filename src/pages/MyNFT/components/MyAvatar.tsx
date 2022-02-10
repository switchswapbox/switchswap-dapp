// hooks
// import useAuth from '../hooks/useAuth';
// utils
// import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = { photoURL: 'https://google.com', displayName: 'Name' };
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
