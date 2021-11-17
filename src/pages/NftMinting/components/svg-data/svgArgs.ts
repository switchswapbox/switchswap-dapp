import { FileInfoType } from '../mintingSteps/StepUploadFile';

export type ArgsProps = {
  qrcode: any;
  qrcodeHash?: any;
  title?: string;
  uploadedCid: FileInfoType;
  others?: any;
};
