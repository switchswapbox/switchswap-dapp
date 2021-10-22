import { FileInfoType } from 'components/_dashboard/nftMinting/mintingSteps/StepUploadFile';
import { RESET_STATE } from 'reduxStore';

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
}

export const changeMintingProcessState = (state: MintingProcessState) => ({
  type: CHANGE_MINTING_PROCESS_STATE,
  state: state
});

export const resetMintingProcessState = () => ({
  type: RESET_STATE
});

// init state
const initialMintingProcessState: MintingProcessState = {
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
  tokenID: 0
};

export const reducerMintingProcess = (
  state = initialMintingProcessState,
  action: { type: string; state: MintingProcessState }
) => {
  switch (action.type) {
    case CHANGE_MINTING_PROCESS_STATE:
      return { ...state, ...action.state };
    case RESET_STATE:
      return initialMintingProcessState;
    default:
      return state;
  }
};
