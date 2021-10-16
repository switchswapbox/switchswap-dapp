import CustomizeQRNormal from './CustomizeQRNormal';
import CustomizeQRRandRect from './CustomizeQRRandRect';
import {
  QRNormal,
  QR25D,
  QRDsj,
  QRRandRect,
  QRImage,
  QRResImage,
  QRBubble,
  QRFunc,
  QRLine,
  SFC
} from 'react-qrbtf';

const qrStyles = {
  qrNormal: {
    Component: QRNormal,
    CustomProps: CustomizeQRNormal
  },
  qrRandRect: {
    Component: QRRandRect,
    CustomProps: CustomizeQRRandRect
  }
};

export default qrStyles;
