import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

import { FileInfoType } from 'components/_dashboard/nftMinting/mintingSteps/StepUploadFile';

export const CHANGE_MINTING_PROCESS_STATE = 'CHANGE_MINTING_PROCESS_STATE';

export type MintingProcessStateAlignement = 'crust' | null;
export interface MintingProcessState {
  activeStep?: number;
  nftType?: string;
  stepOneNotDone?: boolean;
  stepTwoNotDone?: boolean;
  nameNft?: string;
  descNft?: string;
  alignment?: MintingProcessStateAlignement;
  uploadedCid?: FileInfoType;
  metadataCid?: string;
  nftCardCid?: string;
  srcImage?: string;
  transactionHash?: string;
  isMinting?: boolean;
  nftMinted?: boolean;
  tokenID?: number;
  link?: HTMLAnchorElement | null;
}

// init state
export const initialMintingProcessState: MintingProcessState = {
  activeStep: 0,
  nftType: 'withoutNftCard',
  stepOneNotDone: true,
  stepTwoNotDone: true,
  nameNft: '',
  descNft: '',
  alignment: 'crust',
  uploadedCid: { cid: '', name: '', size: 0 },
  metadataCid: '',
  nftCardCid: '',
  srcImage: '',
  transactionHash: '',
  isMinting: false,
  nftMinted: false,
  tokenID: 0,
  link: null
};

const initialState = initialMintingProcessState;

export const reducerMintingProcessSlice = createSlice({
  name: 'reducerMintingProcess',
  initialState,
  reducers: {
    changeMintingProcessState: (state, action) => ({ ...state, ...action.payload }),
    resetMintingProcessState: (state) => initialMintingProcessState
  }
});

export const { changeMintingProcessState, resetMintingProcessState } =
  reducerMintingProcessSlice.actions;

export default reducerMintingProcessSlice.reducer;
