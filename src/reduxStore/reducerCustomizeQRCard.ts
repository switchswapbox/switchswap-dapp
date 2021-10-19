import {
  defaultQR25DOtherProps,
  defaultQRBubbleOtherProps,
  defaultQRDsjOtherProps,
  defaultQRFuncOtherProps,
  defaultQRLineOtherProps,
  defaultQRNormalOtherProps,
  QR25DOtherProps,
  QRBubbleOtherProps,
  QRDsjOtherProps,
  QRFuncOtherProps,
  QRLineOtherProps,
  QRNormalOtherProps,
  QRRandRectOtherProps
} from 'components/_dashboard/nftMinting/qrCardCustomize/defautOtherQRProps';
import { RESET_STATE } from 'reduxStore';

export const CHANGE_QR_CARD_GENERAL_INFO = 'CHANGE_QR_CARD_GENERAL_INFO';
export const CHANGE_OTHER_QR_PROPS = 'CHANGE_OTHER_QR_PROPS';

export type qrStyleNameType =
  | 'qrNormal'
  | 'qrRandRect'
  | 'qrDsj'
  | 'qr25D'
  | 'qrBubble'
  | 'qrFunc'
  | 'qrLine';

export interface OtherQRProps {
  qrNormal?: QRNormalOtherProps;
  qrRandRect?: QRRandRectOtherProps;
  qrDsj?: QRDsjOtherProps;
  qr25D?: QR25DOtherProps;
  qrBubble?: QRBubbleOtherProps;
  qrFunc?: QRFuncOtherProps;
  qrLine?: QRLineOtherProps;
}
export interface InfoQRCard {
  layout?: number;
  qrStyleName?: qrStyleNameType;
  title?: string;
  icon?: string;
  otherQRProps?: OtherQRProps;
}

export const changeQRCardGeneralInfo = (state: InfoQRCard) => ({
  type: CHANGE_QR_CARD_GENERAL_INFO,
  state: state
});

export const changeOtherQRProps = (state: InfoQRCard) => ({
  type: CHANGE_OTHER_QR_PROPS,
  state: state
});

export const resetQRCardInfo = () => ({
  type: RESET_STATE
});

// init state
const initialQRCard: InfoQRCard = {
  layout: 0,
  qrStyleName: 'qrNormal',
  title: '',
  icon: '',
  otherQRProps: {
    qrNormal: defaultQRNormalOtherProps,
    qrDsj: defaultQRDsjOtherProps,
    qr25D: defaultQR25DOtherProps,
    qrBubble: defaultQRBubbleOtherProps,
    qrFunc: defaultQRFuncOtherProps,
    qrLine: defaultQRLineOtherProps
  }
};

export const reducerCustomizeQRCard = (
  state = initialQRCard,
  action: { type: string; state: InfoQRCard }
) => {
  switch (action.type) {
    case CHANGE_QR_CARD_GENERAL_INFO: {
      return { ...state, ...action.state };
    }
    case CHANGE_OTHER_QR_PROPS: {
      const keys = Object.keys(action.state.otherQRProps ? action.state.otherQRProps : {});
      let newState = JSON.parse(JSON.stringify(state));
      for (let key of keys) {
        newState.otherQRProps[key] = {
          ...newState.otherQRProps[key],
          ...(action.state.otherQRProps ? action.state.otherQRProps[key as keyof OtherQRProps] : {})
        };
      }
      return newState;
    }
    case RESET_STATE:
      return initialQRCard;
    default:
      return state;
  }
};
