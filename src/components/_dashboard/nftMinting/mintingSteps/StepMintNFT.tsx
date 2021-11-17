import {
  Box,
  Divider,
  Zoom,
  SvgIcon,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Grid,
  Typography,
  LinearProgress,
  Alert
} from '@mui/material';
import { Icon } from '@iconify/react';
import Label from 'components/Label';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { contractAddress } from 'utils/contractAddress';
import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers } from 'ethers';
import { ABI } from 'utils/abi';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GAS_PRICE } from 'assets/COMMON_VARIABLES';
import { changeMintingProcessState } from 'redux/reducerMintingProcess';
import useLocales from '../../../../hooks/useLocales';
import { NftCardsDesign } from '../NftCardsDesign';
import useSnackbarAction from 'hooks/useSnackbarAction';

type StepMintNFTProps = {
  handleAlignment: (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => void;
};

function StepMintNFT({ handleAlignment }: StepMintNFTProps) {
  const {
    nftType,
    nameNft,
    descNft,
    alignment,
    uploadedCid,
    metadataCid,
    srcImage,
    isMinting,
    transactionHash,
    nftMinted,
    tokenID
  } = useSelector((state: RootState) => {
    return {
      nftType: state.reducerMintingProcess.nftType,
      nameNft: state.reducerMintingProcess.nameNft,
      descNft: state.reducerMintingProcess.descNft,
      alignment: state.reducerMintingProcess.alignment,
      uploadedCid: state.reducerMintingProcess.uploadedCid,
      metadataCid: state.reducerMintingProcess.metadataCid,
      srcImage: state.reducerMintingProcess.srcImage,
      transactionHash: state.reducerMintingProcess.transactionHash,
      isMinting: state.reducerMintingProcess.isMinting,
      nftMinted: state.reducerMintingProcess.nftMinted,
      tokenID: state.reducerMintingProcess.tokenID
    };
  });
  const dispatch = useDispatch();
  const onSnackbarAction = useSnackbarAction();
  const { translate } = useLocales();
  async function mintDataNTF() {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        dispatch(changeMintingProcessState({ isMinting: true }));
        const providerEthers = new ethers.providers.Web3Provider(provider);
        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, ABI, providerEthers);
        const signedContract = contract.connect(signer);
        const dataRegistrationProof =
          uploadedCid?.txHash || '' ? `crust://${uploadedCid?.txHash}` : 'null';
        signedContract
          .mintDataNTF(
            addr,
            `ipfs://${metadataCid}`,
            `ipfs://${uploadedCid ? uploadedCid.cid : ''}`,
            dataRegistrationProof,
            { gasPrice: BigNumber.from(GAS_PRICE) }
          )
          .then((tx: any) => {
            dispatch(changeMintingProcessState({ transactionHash: tx.hash }));
            providerEthers.waitForTransaction(tx.hash).then(() => {
              dispatch(changeMintingProcessState({ isMinting: false }));
              dispatch(changeMintingProcessState({ nftMinted: true }));
              providerEthers.getTransactionReceipt(tx.hash).then((receipt: any) => {
                dispatch(
                  changeMintingProcessState({ tokenID: parseInt(receipt.logs[0].topics[3], 16) })
                );
              });
            });
          })
          .catch((error: any) => {
            onSnackbarAction(
              'info',
              "Transaction failed. Get the faucet in funbox if you don't have enough $MATIC",
              null,
              'GET FAUCET',
              '#/fun-box/matic-faucet'
            );
            dispatch(changeMintingProcessState({ isMinting: false }));
          });
      }
    }
  }

  return (
    <>
      <Grid container spacing={3} sx={{ pt: 5 }}>
        <Grid item xs={12} md={6} lg={7}>
          {/* <ProductDetailsCarousel product={product} /> */}
          <Stack alignItems="center" justifyContent="center">
            <Box sx={{ borderRadius: 2 }} component="img" src={srcImage} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase' }}>
            {translate(`nftMinting.minting`)}
          </Label>
          <Typography
            variant="h5"
            paragraph
            sx={{
              mt: 2,
              mb: 0
            }}
          >
            {nameNft}
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {descNft}
            </Typography>
          </Box>
        </Grid>
        {nftType === 'simplified' || nftType === 'withAuthorReg' ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <Stack width="50%" display="flex" alignItems="center">
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '80%'
                }}
              >
                <NftCardsDesign />
              </Stack>
            </Stack>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>

      {isMinting ? <LinearProgress color="info" sx={{ my: 3 }} /> : <Divider sx={{ my: 3 }} />}
      <Grid
        container
        sx={{
          // borderRadius: 1,
          // border: (theme) => `solid 1px ${theme.palette.divider}`,
          bgcolor: 'background.paper'
        }}
        spacing={1}
      >
        <Grid item xs={12} md={3}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ height: '100%' }}>
            <Typography variant="h6">{translate(`nftMinting.mint`)}</Typography>
            <Tooltip
              TransitionComponent={Zoom}
              title="You must have a small amount of token in your wallet"
            >
              <HelpOutlineIcon />
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Button
              size="large"
              type="button"
              color="warning"
              variant="contained"
              onClick={mintDataNTF}
              startIcon={
                <Box
                  component="img"
                  src="./static/icons/shared/polygon.svg"
                  sx={{ height: '24px', width: '32px' }}
                />
              }
              sx={{ whiteSpace: 'nowrap' }}
            >
              {translate(`nftMinting.minting`)}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ pt: 3, display: transactionHash !== '' ? 'flex' : 'none' }}>
        <Alert
          icon={false}
          severity={nftMinted ? 'success' : 'info'}
          sx={{
            width: '100%',
            wordBreak: 'break-word'
          }}
        >
          {nftMinted
            ? `Your NFT is minted with transaction hash: ${transactionHash} `
            : `Your request of minting NFT is in progress with transaction hash: ${transactionHash} `}
          <SvgIcon>
            <Icon icon="fxemoji:rocket" />
          </SvgIcon>
        </Alert>
      </Grid>

      {isMinting ? (
        <LinearProgress variant="query" color="info" sx={{ my: 3 }} />
      ) : (
        <Divider sx={{ my: 3 }} />
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center' }}
        sx={{ pb: 3, width: '100%', display: transactionHash === '' ? 'none' : 'flex' }}
      >
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
          <ToggleButton
            value="etherscan"
            sx={{ minWidth: '56px', display: transactionHash === '' ? 'none' : 'flex' }}
            href={transactionHash !== '' ? `https://polygonscan.com/tx/${transactionHash}` : ''}
            target="_blank"
          >
            <Box
              component="img"
              src="./static/icons/shared/polygon-white.svg"
              sx={{ height: '24px', width: '32px' }}
            />
          </ToggleButton>
          <ToggleButton
            value="switchswap"
            sx={{ minWidth: '56px', display: tokenID === 0 ? 'none' : 'flex' }}
            href={tokenID !== 0 ? `#/assets/polygon/${contractAddress}/${tokenID}` : ''}
            target="_blank"
          >
            <Box
              component="img"
              src="./static/icons/shared/switchswap.png"
              sx={{ height: '24px', borderRadius: '50%' }}
            />
          </ToggleButton>
          <ToggleButton
            value="opensea"
            sx={{ minWidth: '56px', display: tokenID === 0 ? 'none' : 'flex' }}
            href={
              tokenID !== 0 ? `https://opensea.io/assets/matic/${contractAddress}/${tokenID}` : ''
            }
            target="_blank"
          >
            <Box
              component="img"
              src="./static/icons/shared/opensea.svg"
              sx={{ height: '24px', width: '32px' }}
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </>
  );
}

export default StepMintNFT;
