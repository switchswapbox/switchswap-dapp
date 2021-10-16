import { createContext } from 'react';

export interface QRCardCustomizeContextInterface {
  value: string;
  setValue: (value: string) => void;
  icon: string;
  setIcon: (icon: string) => void;
  other: any;
  setOther: (other: any) => void;
}

const DefaultQRContext: QRCardCustomizeContextInterface = {
  value: '',
  setValue: () => {},
  icon: 'crust',
  setIcon: () => {},
  other: { qrnormal: {} },
  setOther: () => {}
};

export const QRCardCustomizeContext =
  createContext<QRCardCustomizeContextInterface>(DefaultQRContext);
