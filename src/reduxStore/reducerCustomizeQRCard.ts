import {
  defaultQR25DOtherProps,
  defaultQRBubbleOtherProps,
  defaultQRDsjOtherProps,
  defaultQRNormalOtherProps
} from 'components/_dashboard/nftMinting/qrCardCustomize/defautOtherQRProps';

export const CHANGE_QR_LAYOUT = 'CHANGE_QR_LAYOUT';
export const CHANGE_QR_STYLE_NAME = 'CHANGE_QR_STYLE_NAME';
export const CHANGE_QR_MID_ICON = 'CHANGE_QR_MID_ICON';
export const CHANGE_CARD_TITLE = 'CHANGE_CARD_TITLE';
export const CHANGE_OTHER_QR_PROPS = 'CHANGE_OTHER_QR_PROPS';

export type qrStyleNameType = 'qrNormal' | 'qrRandRect' | 'qrDsj' | 'qr25D' | 'qrBubble';
export interface InfoQRCard {
  layout?: number;
  qrStyleName?: qrStyleNameType;
  title?: string;
  icon?: string;
  otherQRProps?: any;
}

export const changeQRCard = (infoQRCard: InfoQRCard) => ({
  type: CHANGE_QR_LAYOUT,
  infoQRCard: infoQRCard
});

export const changeQRStyleName = (infoQRCard: InfoQRCard) => ({
  type: CHANGE_QR_STYLE_NAME,
  infoQRCard: infoQRCard
});

export const changeCardTitle = (infoQRCard: InfoQRCard) => ({
  type: CHANGE_CARD_TITLE,
  infoQRCard: infoQRCard
});

export const changeQRMidIcon = (infoQRCard: InfoQRCard) => ({
  type: CHANGE_QR_MID_ICON,
  infoQRCard: infoQRCard
});

export const changeOtherQRProps = (infoQRCard: InfoQRCard) => ({
  type: CHANGE_OTHER_QR_PROPS,
  infoQRCard: infoQRCard
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
    qrBubble: defaultQRBubbleOtherProps
  }
};

export const qrCardReducer = (
  state = initialQRCard,
  action: { type: string; infoQRCard: InfoQRCard }
) => {
  switch (action.type) {
    case CHANGE_QR_LAYOUT:
      return {
        ...state,
        layout: action.infoQRCard.layout
      };
    case CHANGE_QR_STYLE_NAME:
      return {
        ...state,
        qrStyleName: action.infoQRCard.qrStyleName
      };
    case CHANGE_CARD_TITLE:
      return {
        ...state,
        title: action.infoQRCard.title
      };
    case CHANGE_QR_MID_ICON:
      return {
        ...state,
        icon: action.infoQRCard.icon
      };
    case CHANGE_OTHER_QR_PROPS: {
      const keys = Object.keys(action.infoQRCard.otherQRProps);
      let newState = JSON.parse(JSON.stringify(state));
      for (let key of keys) {
        newState.otherQRProps[key] = {
          ...newState.otherQRProps[key],
          ...action.infoQRCard.otherQRProps[key]
        };
      }
      return newState;
    }
    default:
      return state;
  }
};
