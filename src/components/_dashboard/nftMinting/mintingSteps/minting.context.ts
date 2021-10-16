import { createContext } from 'react';
import { FileInfoType } from './StepUploadFile';

export interface MintingContextInterface {
  stepOneNotDone: boolean;
  setStepOneNotDone: (stepOneNotDone: boolean) => void;
  stepTwoNotDone: boolean;
  setStepTwoNotDone: (stepTwoNotDone: boolean) => void;
  nameNft: string;
  setNameNft: (nameNft: string) => void;
  descNft: string;
  setDescNft: (descNft: string) => void;
  alignment: string | null;
  setAlignment: (alignment: string | null) => void;
  uploadedCid: FileInfoType;
  setUploadedCid: (uploadedCid: FileInfoType) => void;
  metadataCid: string;
  setMetadataCid: (metadataCid: string) => void;
  srcImage: string;
  setSrcImage: (srcImage: string) => void;
}

const DefaultMintingContext: MintingContextInterface = {
  stepOneNotDone: false,
  setStepOneNotDone: () => {},
  stepTwoNotDone: true,
  setStepTwoNotDone: () => {},
  nameNft: '',
  setNameNft: () => {},
  descNft: '',
  setDescNft: () => {},
  alignment: '',
  setAlignment: () => {},
  uploadedCid: { cid: '', name: '', size: 0 },
  setUploadedCid: () => {},
  metadataCid: '',
  setMetadataCid: () => {},
  srcImage: '',
  setSrcImage: () => {}
};

export const MintingContext = createContext<MintingContextInterface>(DefaultMintingContext);
