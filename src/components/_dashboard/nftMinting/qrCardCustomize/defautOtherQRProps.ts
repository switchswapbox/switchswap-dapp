interface QRNormalOtherProps {
  type: 'rect' | 'round' | 'rand';
  size: number;
  opacity: number;
  posType: 'rect' | 'round' | 'planet' | 'roundRect';
  otherColor: string;
  posColor: string;
}

export const defaultQRNormalOtherProps: QRNormalOtherProps = {
  type: 'rect',
  size: 100,
  opacity: 100,
  posType: 'rect',
  otherColor: '#000000',
  posColor: '#000000'
};

interface QRDsjOtherProps {
  scale: number;
  crossWidth: number;
  posWidth: number;
  posType: 'rect' | 'dsj';
}

export const defaultQRDsjOtherProps: QRDsjOtherProps = {
  scale: 70,
  crossWidth: 70,
  posWidth: 90,
  posType: 'rect'
};

interface QR25DOtherProps {
  height: Number;
  posHeight: Number;
  topColor: String;
  leftColor: String;
  rightColor: String;
}

export const defaultQR25DOtherProps: QR25DOtherProps = {
  height: 0.5,
  posHeight: 0.5,
  topColor: '#FF7F89',
  leftColor: '#FFD7D9',
  rightColor: '#FFEBF3'
};

interface QRBubbleOtherProps {
  circleColor: String;
  posColor: String;
}

export const defaultQRBubbleOtherProps: QRBubbleOtherProps = {
  circleColor: '#8ED1FC',
  posColor: '#0693E3'
};
