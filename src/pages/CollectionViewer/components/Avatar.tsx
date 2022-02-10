import { forwardRef } from 'react';
import { Avatar as MUIAvatar, AvatarProps } from '@mui/material';

type AvatarColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

export interface Props extends AvatarProps {
  color?: AvatarColor;
}

const Avatar = forwardRef<HTMLDivElement, Props>(({ children, sx, ...other }, ref) => {
  return (
    <MUIAvatar ref={ref} sx={sx} {...other}>
      {children}
    </MUIAvatar>
  );
});

export default Avatar;
