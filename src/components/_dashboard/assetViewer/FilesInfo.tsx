import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot } from '@crustio/type-definitions';

import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { useTheme } from '@mui/material/styles';
import {
  Menu,
  Card,
  Table,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer
} from '@mui/material';
// utils
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';
import { AssetAndOwnerType } from '../../../pages/AssetViewer';
import { CRUST_CHAIN_RPC, CRUST_CONSENSUS_DATE } from 'assets/COMMON_VARIABLES';

const getStatusMainnet = async (cid: string) => {
  try {
    const wsProvider = new WsProvider(CRUST_CHAIN_RPC);
    const chain = new ApiPromise({
      provider: wsProvider,
      typesBundle: typesBundleForPolkadot
    });
    await chain.isReadyOrError;

    const fileInfo = await chain.query.market.files(cid);

    chain.disconnect();
    return fileInfo.toHuman();
  } catch (e) {
    return null;
  }
};

function MoreMenuButton() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>
          <Icon icon="ic:baseline-autorenew" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Renew
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon="carbon:add-alt" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Add Balance
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem>
          <Icon icon="bx:bx-cloud-download" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon="fluent:document-copy-20-regular" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Copy file's address
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

type FileInfoType = {
  fileType: string;
  network: string;
  replicas: string;
  expireOn: string;
  prepaid: string;
};

export default function FilesInfo({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const { contentId, metadataId, nftCardId } = assetAndOwner;

  const [filesInfo, setFilesInfo] = useState<FileInfoType[]>([]);

  const fetchFileInfo = async (cid: string, fileType: string) => {
    const fileInfo = await getStatusMainnet(cid);

    if (fileInfo) {
      const expiredDate = new Date(
        CRUST_CONSENSUS_DATE.getTime() +
          parseInt((fileInfo as any).expired_at.replace(/,/g, ''), 10) * 6 * 1000
      )
        .toISOString()
        .split('T')[0];

      setFilesInfo((filesInfo) => {
        filesInfo.push({
          fileType,
          network: 'Crust',
          replicas: (fileInfo as any).reported_replica_count,
          expireOn: expiredDate,
          prepaid: (fileInfo as any).prepaid
        });
        return [...filesInfo];
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (contentId !== '') {
        fetchFileInfo(contentId, 'NFT Content');
      }
    }
    fetchData();
  }, [contentId]);

  useEffect(() => {
    async function fetchData() {
      if (metadataId !== '') {
        fetchFileInfo(metadataId, 'Metadata');
      }
    }
    fetchData();
  }, [metadataId]);

  useEffect(() => {
    async function fetchData() {
      if (nftCardId !== '' && nftCardId !== contentId) {
        fetchFileInfo(nftCardId, 'NFT Card');
      }
    }
    fetchData();
  }, [nftCardId]);

  return (
    <Card>
      <CardHeader title="Files Status" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 480 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File</TableCell>
                <TableCell align="center">Network</TableCell>
                <TableCell align="center">Replicas</TableCell>
                <TableCell align="center">Expire on</TableCell>
                <TableCell align="center">Prepaid</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filesInfo.map((row) => (
                <TableRow key={row.fileType}>
                  <TableCell>{row.fileType}</TableCell>
                  <TableCell align="center">{row.network}</TableCell>
                  <TableCell align="center">{row.replicas}</TableCell>
                  <TableCell align="center">{row.expireOn}</TableCell>
                  <TableCell align="center">{row.prepaid}</TableCell>
                  <TableCell align="center">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={'success'}
                    >
                      Persistent
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
