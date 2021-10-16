import CustomizeQRNormal from './CustomizeQRNormal';
import CustomizeQRRandRect from './CustomizeQRRandRect';
import CustomizeQRDsj from './CustomizeQRDsj';
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
  },
  qrDsj: {
    Component: QRDsj,
    CustomProps: CustomizeQRDsj
  }
};

export default qrStyles;
