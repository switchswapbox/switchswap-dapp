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
