export type QRNormalOtherPropsTypes = 'rect' | 'round' | 'rand';
export type QRNormalOtherPropsPosTypes = 'rect' | 'round' | 'planet' | 'roundRect';
export interface QRNormalOtherProps {
  type?: QRNormalOtherPropsTypes;
  size?: number;
  opacity?: number;
  posType?: QRNormalOtherPropsPosTypes;
  otherColor?: string;
  posColor?: string;
}

export const defaultQRNormalOtherProps: QRNormalOtherProps = {
  type: 'rect',
  size: 100,
  opacity: 100,
  posType: 'rect',
  otherColor: '#0693E3',
  posColor: '#0693E3'
};

export type QRDsjOtherPropsPosTypes = 'rect' | 'dsj';
export interface QRDsjOtherProps {
  scale?: number;
  crossWidth?: number;
  posWidth?: number;
  posType?: QRDsjOtherPropsPosTypes;
}

export const defaultQRDsjOtherProps: QRDsjOtherProps = {
  scale: 70,
  crossWidth: 70,
  posWidth: 90,
  posType: 'rect'
};

export interface QR25DOtherProps {
  height?: number;
  posHeight?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
}

export const defaultQR25DOtherProps: QR25DOtherProps = {
  height: 0.5,
  posHeight: 0.5,
  topColor: '#0693E3',
  leftColor: '#ABB8C3',
  rightColor: '#ABB8C3'
};

export interface QRBubbleOtherProps {
  circleColor?: string;
  posColor?: string;
}

export const defaultQRBubbleOtherProps: QRBubbleOtherProps = {
  circleColor: '#0693E3',
  posColor: '#0693E3'
};

export interface QRFuncOtherProps {
  funcType?: string;
  type?: string;
  posType?: string;
  otherColor1?: string;
  otherColor2?: string;
  posColor?: string;
}

export const defaultQRFuncOtherProps: QRFuncOtherProps = {
  funcType: 'A',
  type: 'rect',
  posType: 'rect',
  otherColor1: '#0693E3',
  otherColor2: '#0693E3',
  posColor: '#0693E3'
};

export interface QRLineOtherProps {
  funcType?: string;
  posType?: string;
  posColor?: string;
  direction?: string;
  lineWidth?: number;
  lineOpacity?: number;
  lineColor?: string;
}

export const defaultQRLineOtherProps: QRLineOtherProps = {
  funcType: 'A',
  posType: 'rect',
  posColor: '#0693E3',
  direction: 'left-right',
  lineWidth: 50,
  lineOpacity: 100,
  lineColor: '#0693E3'
};

export interface QRRandRectOtherProps {}

export const defaultQRRandRectOtherProps: QRRandRectOtherProps = {};
