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
  TableContainer,
  DialogProps,
  Button,
  Dialog,
  Box,
  Tooltip,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment
} from '@mui/material';
import axios from 'axios';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import { MIconButton } from '../../../components/@material-extend';
import { AssetAndOwnerType } from '../AssetViewer.types';

import marketTypes from '@crustio/type-definitions/src/market';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import useSnackbarAction from 'hooks/useSnackbarAction';
import {
  CRUST_CHAIN_RPC,
  CRUST_CONSENSUS_DATE,
  CRUST_WALLET_WIKI,
  IPFS_GATEWAY_FOR_FETCHING_DATA,
  METADATA_SUBSCAN_CRUST,
  RENEW_PERIOD_BLOCK_NUMBER
} from 'constants/COMMON_VARIABLES';

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
    return fileInfo.toJSON() as FileInfo;
  } catch (e) {
    return null;
  }
};

const publishCidMainnet = async (cid: string, fileSizeInBytes: number) => {
  const extensions = await web3Enable('NFT Dapp');

  if (extensions.length === 0) {
    return null;
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

const addPrepaid = async (cid: string, amount: number) => {
  const extensions = await web3Enable('NFT Dapp');

  if (extensions.length === 0) {
    return null;
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

  const ap = chain.tx.market.addPrepaid(cid, amount);

  const txHash = await ap.signAndSend(account.address, {
    signer: injector.signer,
    nonce: -1
  });

  chain.disconnect();

  return txHash;
};

function MoreMenuButton({ cid, fileSize }: { cid: string; fileSize: number }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const onSnackbarAction = useSnackbarAction();
  const [addPrepaidOpen, setAddPrepaidOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRenewFile = async (cid: string, fileSize: number) => {
    const txHash = await publishCidMainnet(cid, fileSize);
    if (txHash) {
      onSnackbarAction(
        'success',
        'Successfully renew file',
        null,
        'SUBSCAN',
        `https://crust.subscan.io/extrinsic/${txHash}`
      );
    } else {
      onSnackbarAction(
        'warning',
        'Please verify your Crust Wallet',
        null,
        'LEARN',
        CRUST_WALLET_WIKI
      );
    }
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
            handleRenewFile(cid, fileSize);
            handleClose();
          }}
        >
          <Icon icon="ic:baseline-autorenew" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Renew
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAddPrepaidOpen(true);
            handleClose();
          }}
        >
          <Icon icon="carbon:add-alt" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Add Lifetime
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => {
            window.open(`${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${cid}`, '_blank');
            handleClose();
          }}
        >
          <Icon icon="bx:bx-cloud-download" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(`${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${cid}`);
            handleClose();
            onSnackbarAction('success', `Copied file's address`, 2000);
          }}
        >
          <Icon icon="fluent:document-copy-20-regular" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Copy file's address
          </Typography>
        </MenuItem>
      </Menu>

      <AddPrepaidDialog
        cid={cid}
        addPrepaidOpen={addPrepaidOpen}
        setAddPrepaidOpen={setAddPrepaidOpen}
      />
    </>
  );
}

export function AddPrepaidDialog({
  cid,
  addPrepaidOpen,
  setAddPrepaidOpen
}: {
  cid: string;
  addPrepaidOpen: boolean;
  setAddPrepaidOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
  const [prepaidAmountRaw, setPrepaidAmountRaw] = useState('');
  const [prepaidAmount, setPrepaidAmount] = useState(0);
  const [prepaidAmountError, setPrepaidAmountError] = useState(false);
  const onSnackbarAction = useSnackbarAction();

  const handleClose = () => {
    setAddPrepaidOpen(false);
  };

  const handleConfirm = async () => {
    if (!prepaidAmountError) {
      setAddPrepaidOpen(false);
      const txHash = await addPrepaid(cid, prepaidAmount * 10 ** 12);
      if (txHash) {
        onSnackbarAction(
          'success',
          'Successfully add prepaid',
          null,
          'SUBSCAN',
          `https://crust.subscan.io/extrinsic/${txHash}`
        );
      } else {
        onSnackbarAction(
          'warning',
          'Please verify your Crust Wallet',
          null,
          'LEARN',
          CRUST_WALLET_WIKI
        );
      }
    }
  };

  const handlePrepaidAmountRaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrepaidAmountRaw(e.target.value);
    if (isNaN(e.target.value as any) || isNaN(parseFloat(e.target.value))) {
      setPrepaidAmountError(true);
    } else {
      setPrepaidAmountError(false);
      setPrepaidAmount(parseFloat(e.target.value));
    }
  };

  return (
    <>
      <Dialog open={addPrepaidOpen} maxWidth={maxWidth} onClose={handleClose} fullWidth={fullWidth}>
        <DialogTitle>Amount of prepaid in CRU</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The file will be automatically renewed with the prepaid fund
          </DialogContentText>

          <Box
            sx={{
              pt: 2,
              margin: 'auto',
              display: 'flex',
              width: '100%',
              flexDirection: 'column'
            }}
          >
            <TextField
              error={prepaidAmountError}
              helperText={prepaidAmountError ? 'Please enter a valid number' : null}
              id="amout-CRU-prepaid"
              value={prepaidAmountRaw}
              onChange={handlePrepaidAmountRaw}
              InputProps={{
                endAdornment: <InputAdornment position="start">CRU</InputAdornment>
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type FileInfoType = {
  cid: string;
  fileType: string;
  network: string;
  replicas: string;
  realTimeStorageFee: number;
  expireOn: string;
  guaranteedLifetime: string;
  prepaid: string;
  fileSize: number;
};

type MetaDataSubscan = {
  isDone: boolean;
  blockNum: number;
  avgBlockTime: number;
  fileBaseFee: number;
  fileByteFee: number;
  fileKeysCountFee: number;
};

const daysNumberToHumanReadable = (days: number): string => {
  let daysReadable = '';
  let daysLeft = days;
  const year = Math.floor(daysLeft / 365);
  if (year) {
    daysReadable += year + (year > 1 ? ' years ' : ' year ');
    daysLeft -= year * 365;
  }
  const month = Math.floor(daysLeft / (365 / 12));
  if (month > 0) {
    daysReadable += month + (month > 1 ? ' months ' : ' month ');
    daysLeft -= month * (365 / 12);
  }

  if (year) {
    return daysReadable;
  }

  if (daysLeft) {
    daysReadable += Math.floor(daysLeft) + ' days';
  }

  return daysReadable;
};

export default function FilesInfo({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const { contentId, metadataId, nftCardId } = assetAndOwner;
  const [loading, setLoading] = useState(true);
  const [metadataSubscan, setMetadataSubscan] = useState<MetaDataSubscan>({
    isDone: false,
    blockNum: 0,
    avgBlockTime: 0,
    fileBaseFee: 0,
    fileByteFee: 0,
    fileKeysCountFee: 0
  });
  const [filesInfo, setFilesInfo] = useState<FileInfoType[]>([]);

  const fetchFileInfo = async (cid: string, fileType: string) => {
    const fileInfo: FileInfo | null = await getStatusMainnet(cid);

    if (fileInfo) {
      const expiredDate = new Date(
        CRUST_CONSENSUS_DATE.getTime() + parseInt(fileInfo.expired_at, 10) * 6 * 1000
      )
        .toISOString()
        .split('T')[0];

      let guaranteedBlock = parseInt(fileInfo.expired_at, 10) - metadataSubscan.blockNum;
      guaranteedBlock = guaranteedBlock > 0 ? guaranteedBlock : 0;
      let realTimeStorageFee = 0;

      realTimeStorageFee =
        metadataSubscan.fileByteFee * Math.ceil(parseInt(fileInfo.file_size, 10) / (1024 * 1024)) +
        metadataSubscan.fileBaseFee +
        metadataSubscan.fileKeysCountFee;

      if (parseInt(fileInfo.prepaid, 10) > 0) {
        guaranteedBlock +=
          Math.floor(parseInt(fileInfo.prepaid, 10) / realTimeStorageFee) *
          RENEW_PERIOD_BLOCK_NUMBER;
      }

      const guaranteedDays = Math.floor(
        (guaranteedBlock * metadataSubscan.avgBlockTime) / (3600 * 24)
      );

      setFilesInfo((filesInfo) => {
        const newFileInfo = {
          fileType,
          network: 'Crust',
          realTimeStorageFee,
          replicas: fileInfo.reported_replica_count,
          expireOn: expiredDate,
          guaranteedLifetime: daysNumberToHumanReadable(guaranteedDays),
          prepaid: fileInfo.prepaid,
          fileSize: parseInt(fileInfo.file_size, 10),
          cid
        };

        return [...filesInfo, newFileInfo];
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get(METADATA_SUBSCAN_CRUST).then((response) => {
      if (response.status === 200) {
        setMetadataSubscan({
          isDone: true,
          blockNum: parseInt(response.data.data.blockNum),
          avgBlockTime: parseFloat(response.data.data.avgBlockTime),
          fileBaseFee: parseInt(response.data.data.fileBaseFee),
          fileByteFee: parseInt(response.data.data.fileByteFee),
          fileKeysCountFee: parseInt(response.data.data.fileKeysCountFee)
        });
      }
    });
  }, []);

  useEffect(() => {
    if (contentId !== '' && nftCardId !== '' && metadataSubscan.isDone) {
      if (contentId === nftCardId) {
        fetchFileInfo(contentId, 'NFT Content');
      } else {
        fetchFileInfo(contentId, 'NFT Content');
        fetchFileInfo(nftCardId, 'NFT Card');
      }
    }
  }, [contentId, nftCardId, metadataSubscan]);

  useEffect(() => {
    if (metadataId !== '' && metadataSubscan.isDone) {
      fetchFileInfo(metadataId, 'Metadata');
    }
  }, [metadataId, metadataSubscan]);

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
                <TableCell align="center">
                  <Tooltip title="The lifetime is calculated based on the real-time status of the network, it could be slightly changed later.">
                    <Stack direction="row" justifyContent="center">
                      <Typography variant="subtitle2">Guaranteed Lifetime</Typography>
                      <Typography variant="subtitle2" color="red">
                        *
                      </Typography>
                    </Stack>
                  </Tooltip>
                </TableCell>
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
                  <TableCell align="center">{row.guaranteedLifetime}</TableCell>
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
