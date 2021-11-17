import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Card, Stack, Typography, CardHeader } from '@mui/material';
import { fDate } from '../../../utils/formatTime';
import { MAvatar } from '../../../components/@material-extend';
import { AssetAndOwnerType } from '../AssetViewer.types';
import { shortenAddress } from 'utils/formatAddress';
import { LineScalePulseOutRapid } from 'react-pure-loaders';

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const [loading, setLoading] = useState(true);

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MAvatar src={assetAndOwner.ownerIcon} alt="uniqueIcon" />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {shortenAddress(assetAndOwner.ownerAddress, 8)}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(Date.now())}
          </Typography>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            <Box
              component="img"
              alt="post media"
              src={assetAndOwner.imageUrl}
              onLoad={() => setLoading(false)}
              sx={{
                display: loading ? 'none' : 'block'
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <LineScalePulseOutRapid color={'#637381'} loading={loading} />
          </Stack>
        </Box>

        {/* <Stack direction="row" alignItems="center">
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
        </Stack> */}
        <Stack>
          <Typography variant="subtitle1">{assetAndOwner.name}</Typography>
          <Typography variant="body2">{assetAndOwner.description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
