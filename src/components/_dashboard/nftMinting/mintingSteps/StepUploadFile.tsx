import { Box, Stack, SvgIcon, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import UploadMultiFile from '../UploadMultiFile';
import { create } from 'ipfs-http-client';

import {
  IPFS_GATEWAY_W3AUTH,
  IPFS_PINNING_SERVICE_W3AUTH,
  CRUST_WALLET_WIKI,
  METAMASK_SELECT_POLYGON_URL,
  INSTALL_METAMASK_URL
} from '../../../../assets/COMMON_VARIABLES';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import { ethers } from 'ethers';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeMintingProcessState } from 'reduxStore/reducerMintingProcess';
import useSnackbarAction from 'hooks/useSnackbarAction';
import useLocales from '../../../../hooks/useLocales';
import pinFileToW3Gateway from 'utils/pinFileToW3Gateway';
import generateRandomAuthHeaderSubstrate from 'utils/generateRandomAuthHeaderSubstrate';
import publishCidToCrust from 'utils/publishCidToCrust';

const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];
const ipfsPinningService = IPFS_PINNING_SERVICE_W3AUTH[0];

export type FileInfoType = {
  name: string;
  cid: string;
  size: number;
  txHash?: string;
};

export const pinW3Crust = async (authHeader: string, cid: string, name: string) => {
  await axios.post(
    ipfsPinningService + '/pins',
    {
      cid,
      name
    },
    {
      headers: {
        authorization: 'Bearer ' + authHeader,
        'Content-Type': 'application/json'
      }
    }
  );
};

function StepUploadFile() {
  const { stepOneNotDone, uploadedCid } = useSelector((state: IRootState) => {
    return {
      stepOneNotDone: state.reducerMintingProcess.stepOneNotDone,
      uploadedCid: state.reducerMintingProcess.uploadedCid
    };
  });
  const dispatch = useDispatch();
  const onSnackbarAction = useSnackbarAction();
  const { translate } = useLocales();

  const [files, setFiles] = useState<File[]>([]);
  const [isFileUploading, setFileUploading] = useState(false);

  const loadImg = () => {
    const reader = new FileReader();

    reader.onload = async () => {
      dispatch(changeMintingProcessState({ srcImage: reader.result as string }));
    };
    reader.readAsDataURL(files[0]);
  };

  useEffect(() => {
    if (files[0]) {
      loadImg();
    }
  }, [files[0]]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles.map((file: File) => file));
    },
    [setFiles]
  );

  const handleRemove = (file: File | string) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  function uploadFileW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setFileUploading(true);
      const ipfs = create({
        url: ipfsGateway + '/api/v0',
        headers: {
          authorization: 'Basic ' + authHeader
        }
      });
      const reader = new FileReader();
      reader.onabort = () => reject('file reading was aborted');
      reader.onerror = () => reject('file reading has failed');
      reader.onload = async () => {
        const added = await ipfs.add(reader.result as ArrayBuffer);
        dispatch(
          changeMintingProcessState({
            uploadedCid: {
              cid: added.cid.toV0().toString(),
              size: added.size / 1000,
              name: files[0].name
            }
          })
        );
        setFileUploading(false);
        dispatch(changeMintingProcessState({ stepOneNotDone: false }));
        resolve({ cid: added.cid.toV0().toString(), name: files[0].name });
      };
      reader.readAsArrayBuffer(files[0]);
    });
  }

  const uploadFileMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        await provider.request({ method: 'eth_requestAccounts' });

        const providerEthers = new ethers.providers.Web3Provider(provider);

        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const signature = await signer.signMessage(addr);

        const authHeader = Buffer.from(`pol-${addr}:${signature}`).toString('base64');

        uploadFileW3GatewayPromise(authHeader)
          .then((uploadedFileInfo) => {
            pinW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        onSnackbarAction(
          'warning',
          'Please select Polygon Network from Metamask',
          null,
          'LEARN MORE',
          METAMASK_SELECT_POLYGON_URL
        );
      }
    } else {
      onSnackbarAction(
        'warning',
        'Please install Metamask',
        null,
        'LEARN MORE',
        INSTALL_METAMASK_URL
      );
    }
  };

  const uploadFileCrust = async () => {
    setFileUploading(true);
    const extensions = await web3Enable('NFT Dapp');
    if (extensions.length === 0) {
      onSnackbarAction(
        'warning',
        'Please install Crust Wallet',
        null,
        'LEARN MORE',
        CRUST_WALLET_WIKI
      );
      return;
    }
    const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();

    let crustAccountIndex = parseInt(localStorage.getItem('selectedAccountCrustIndex') || '0', 10);

    crustAccountIndex =
      crustAccountIndex < allAccounts.length && crustAccountIndex >= 0 ? crustAccountIndex : 0;

    const account = allAccounts[crustAccountIndex];

    const injector = await web3FromSource(account.meta.source);

    const signRaw = injector?.signer?.signRaw;

    let signature = '';
    if (!!signRaw) {
      // after making sure that signRaw is defined
      // we can use it to sign our message
      signature = (
        await signRaw({
          address: account.address,
          data: stringToHex(account.address),
          type: 'bytes'
        })
      ).signature;
    }
    const authHeader = Buffer.from(`sub-${account.address}:${signature}`).toString('base64');

    uploadFileW3GatewayPromise(authHeader)
      .then((uploadedFileInfo) => {
        pinW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadFileCrustWithToken = async () => {
    const authHeader = generateRandomAuthHeaderSubstrate();

    setFileUploading(true);
    const uploadedFileInfo = await pinFileToW3Gateway(authHeader, files[0]);

    const txHash = await publishCidToCrust(uploadedFileInfo.cid, uploadedFileInfo.size);

    if (!txHash) {
      setFileUploading(false);
      onSnackbarAction(
        'warning',
        'Please install Crust Wallet',
        null,
        'LEARN MORE',
        CRUST_WALLET_WIKI
      );
    } else {
      dispatch(
        changeMintingProcessState({
          uploadedCid: {
            cid: uploadedFileInfo.cid,
            size: uploadedFileInfo.size,
            name: uploadedFileInfo.name,
            txHash
          }
        })
      );
      dispatch(changeMintingProcessState({ stepOneNotDone: false }));
      setFileUploading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', mt: 3, mb: 1 }}>
        <Typography variant="h6">{translate(`nftMinting.upload file`)}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />
          }
          label="Show Preview"
        /> */}
      </Box>
      <UploadMultiFile
        showPreview={false}
        files={files}
        onDrop={handleDropMultiFile}
        onRemove={handleRemove}
        onUploadFile={{ uploadFileMetamask, uploadFileCrust, uploadFileCrustWithToken }}
        isFileUploading={isFileUploading}
        stepOneNotDone={stepOneNotDone as boolean}
      />

      {(uploadedCid ? uploadedCid.cid !== '' : false) && (
        <Box
          sx={{
            my: 1,
            px: 2,
            py: 1,
            borderRadius: 1,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            bgcolor: '#C8FACD'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SvgIcon color="action">
              <Icon icon="teenyicons:certificate-outline" color="black" />
            </SvgIcon>
            <Stack direction="column">
              <Typography variant="subtitle2">
                {translate(`nftMinting.uploaded successfully`)}
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                CID: {uploadedCid ? uploadedCid.cid : ''}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
      {/* <UploadSingleFile file={file} onDrop={handleDropSingleFile} /> */}
    </>
  );
}

export default StepUploadFile;
