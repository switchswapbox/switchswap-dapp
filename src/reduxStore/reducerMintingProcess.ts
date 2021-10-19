import { FileInfoType } from 'components/_dashboard/nftMinting/mintingSteps/StepUploadFile';
import { RESET_STATE } from 'reduxStore';

export const CHANGE_MINTING_PROCESS_STATE = 'CHANGE_MINTING_PROCESS_STATE';

export type MintingProcessStateAlignement = 'crust' | null;
export interface MintingProcessState {
  nftType?: string;
  stepOneNotDone?: boolean;
  stepTwoNotDone?: boolean;
  nameNft?: string;
  descNft?: string;
  alignment?: MintingProcessStateAlignement;
  uploadedCid?: FileInfoType;
  metadataCid?: string;
  srcImage?: string;
}

export const changeMintingProcessState = (state: MintingProcessState) => ({
  type: CHANGE_MINTING_PROCESS_STATE,
  state: state
});

// init state
const initialMintingProcessState: MintingProcessState = {
  stepOneNotDone: true,
  stepTwoNotDone: true,
  nameNft: '',
  descNft: '',
  alignment: 'crust',
  uploadedCid: { cid: '', name: '', size: 0 },
  metadataCid: '',
  srcImage: ''
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
