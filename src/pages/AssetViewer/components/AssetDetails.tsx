import {
  Card,
  Typography,
  CardHeader,
  Stack,
  ButtonBase,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';

import { AssetAndOwnerType } from '../AssetViewer.types';
import { shortenAddress } from 'utils/formatAddress';
import useLocales from '../../../hooks/useLocales';
export default function AssetDetails({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const { translate } = useLocales();
  return (
    <Card>
      <CardHeader title="Asset Details" />

      <Stack spacing={1} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.contract`)}</Typography>
          <ButtonBase>
            <Typography variant="body2">
              {shortenAddress(assetAndOwner.contractAddress, 5)}
            </Typography>
          </ButtonBase>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.id`)}</Typography>
          <ButtonBase>
            <Typography variant="body2">{assetAndOwner.tokenId}</Typography>
          </ButtonBase>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.standard`)}</Typography>
          <Typography variant="body2">ERC721</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.network`)}</Typography>
          <Typography variant="body2">Polygon</Typography>
        </Stack>
      </Stack>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Tooltip title="Transaction History">
          <IconButton
            href={`https://polygonscan.com/token/${assetAndOwner.contractAddress}?a=${assetAndOwner.tokenId}`}
            target="_blank"
          >
            <Box component="img" src="./static/icons/shared/polygon.svg" sx={{ height: 24 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Opensea Viewer">
          <IconButton
            href={`https://opensea.io/assets/matic/${assetAndOwner.contractAddress}/${assetAndOwner.tokenId}`}
            target="_blank"
          >
            <Box component="img" src="./static/icons/shared/opensea.svg" sx={{ height: 24 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
