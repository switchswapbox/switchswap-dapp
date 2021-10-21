import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import roundSend from '@iconify/icons-ic/round-send';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  CardProps,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel
} from '@mui/material';
// @types
import { UserPost } from '../../../@types/user';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import { MAvatar } from '../../@material-extend';
import { AssetAndOwnerType } from '../../../pages/AssetViewer';

// ----------------------------------------------------------------------

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [isLiked, setLiked] = useState(true);
  const [likes, setLikes] = useState(5);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MAvatar src={assetAndOwner.ownerIcon} alt="uniqueIcon" />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            Address
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(Date.now())}
          </Typography>
        }
        action={
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box sx={{ position: 'relative', pt: 'calc(100% / 16 * 9)' }}>
          <Box
            component="img"
            alt="post media"
            src={assetAndOwner.ownerIcon}
            sx={{
              top: 0,
              width: 1,
              height: 1,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        </Box>

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Icon icon={heartFill} />}
                checkedIcon={<Icon icon={heartFill} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />

          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Icon icon={messageSquareFill} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Icon icon={shareFill} width={20} height={20} />
          </IconButton>
        </Stack>
        <Stack>
          <Typography variant="body1">Message</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
