import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot } from '@crustio/type-definitions';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { useTheme } from '@mui/material/styles';
import {
  Menu,
  Card,
  Table,
  Stack,
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
import marketTypes from '@crustio/type-definitions/src/market';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

type FileInfo = typeof marketTypes.types.FileInfo;

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
    return fileInfo.toHuman() as FileInfo;
  } catch (e) {
    return null;
  }
};

const publishCidMainnet = async (cid: string, fileSizeInBytes: number) => {
  const extensions = await web3Enable('NFT Dapp');
  if (extensions.length === 0) {
    // onSnackbarAction('warning', 'Please install Crust Wallet', CRUST_WALLET_WIKI);
    return;
  }

  const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();

  let crustAccountIndex = parseInt(localStorage.getItem('selectedAccountCrustIndex') || '0', 10);

  crustAccountIndex =
    crustAccountIndex < allAccounts.length && crustAccountIndex >= 0 ? crustAccountIndex : 0;

  const account = allAccounts[crustAccountIndex];

  const injector = await web3FromSource(account.meta.source);

  const wsProvider = new WsProvider(CRUST_CHAIN_RPC);
  const chain = new ApiPromise({
    provider: wsProvider,
    typesBundle: typesBundleForPolkadot
  });

  await chain.isReadyOrError;

  const transferExtrinsic = chain.tx.market.placeStorageOrder(cid, fileSizeInBytes, 0, '');

  const txHash = await transferExtrinsic.signAndSend(account.address, {
    signer: injector.signer,
    nonce: -1
  });

  chain.disconnect();

  return txHash;
};

function MoreMenuButton({ cid, fileSize }: { cid: string; fileSize: number }) {
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
        <MenuItem
          onClick={() => {
            publishCidMainnet(cid, fileSize);
          }}
        >
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
  cid: string;
  fileType: string;
  network: string;
  replicas: string;
  expireOn: string;
  prepaid: string;
  fileSize: number;
};

export default function FilesInfo({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const { contentId, metadataId, nftCardId } = assetAndOwner;
  const [loading, setLoading] = useState(true);

  const [filesInfo, setFilesInfo] = useState<FileInfoType[]>([]);

  const fetchFileInfo = async (cid: string, fileType: string) => {
    const fileInfo: FileInfo | null = await getStatusMainnet(cid);

    if (fileInfo) {
      const expiredDate = new Date(
        CRUST_CONSENSUS_DATE.getTime() +
          parseInt(fileInfo.expired_at.replace(/,/g, ''), 10) * 6 * 1000
      )
        .toISOString()
        .split('T')[0];

      console.log(fileInfo);

      setFilesInfo((filesInfo) => {
        const newFileInfo = {
          fileType,
          network: 'Crust',
          replicas: fileInfo.reported_replica_count,
          expireOn: expiredDate,
          prepaid: fileInfo.prepaid,
          fileSize: parseInt(fileInfo.file_size.replace(/,/g, ''), 10),
          cid
        };

        return [...filesInfo, newFileInfo];
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contentId !== '' && nftCardId !== '') {
      if (contentId === nftCardId) {
        fetchFileInfo(contentId, 'NFT Content');
      } else {
        fetchFileInfo(contentId, 'NFT Content');
        fetchFileInfo(nftCardId, 'NFT Card');
      }
    }
  }, [contentId, nftCardId]);

  useEffect(() => {
    if (metadataId !== '') {
      fetchFileInfo(metadataId, 'Metadata');
    }
  }, [metadataId]);

  return (
    <Card>
      <CardHeader title="Files Status" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 700 }}>
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
                    <MoreMenuButton cid={row.cid} fileSize={row.fileSize} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Stack
        sx={{ height: '150px', display: loading ? 'flex' : 'none' }}
        alignItems="center"
        justifyContent="center"
      >
        <LineScalePulseOutRapid color={'#637381'} loading={loading} />
      </Stack>
    </Card>
  );
}
