import CustomizeQRNormal from './CustomizeQRNormal';
import CustomizeQRRandRect from './CustomizeQRRandRect';
import CustomizeQRDsj from './CustomizeQRDsj';
import CustomizeQR25D from './CustomizeQR25D';
import {
  QRNormal,
  QR25D,
  QRDsj,
  QRRandRect,
  QRImage,
  QRResImage,
  QRFunc,
  QRLine,
  SFC,
  QRBubble
} from 'react-qrbtf';
import CustomizeQRBubble from './CustomizeQRBubble';
import CustomizeQRFunc from './CustomizeQRFunc';

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
  },
  qr25D: {
    Component: QR25D,
    CustomProps: CustomizeQR25D
  },
  qrBubble: {
    Component: QRBubble,
    CustomProps: CustomizeQRBubble
  },
  qrFunc: {
    Component: QRFunc,
    CustomProps: CustomizeQRFunc
  }
};

export default qrStyles;
