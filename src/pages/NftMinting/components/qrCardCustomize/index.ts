import CustomizeQRNormal from './CustomizeQRNormal';
import CustomizeQRRandRect from './CustomizeQRRandRect';
import CustomizeQRDsj from './CustomizeQRDsj';
import CustomizeQR25D from './CustomizeQR25D';
import CustomizeQRBubble from './CustomizeQRBubble';
import CustomizeQRFunc from './CustomizeQRFunc';
import CustomizeQRLine from './CustomizeQRLine';
import { QRNormal, QRDsj, QRRandRect, QRFunc, QRLine } from 'react-qrbtf';
import QR25D from '../qrStyles/QR25D';
import QRBubble from '../qrStyles/QRBubble';

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
  },
  qrLine: {
    Component: QRLine,
    CustomProps: CustomizeQRLine
  }
};

export default qrStyles;
