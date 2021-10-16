export const CHANGE_QR_LAYOUT = 'CHANGE_QR_LAYOUT';
export const CHANGE_QR_MID_ICON = 'CHANGE_QR_MID_ICON';
export const CHANGE_CARD_TITLE = 'CHANGE_CARD_TITLE';

export interface InfoQRCard {
  layout?: number;
  title?: string;
  icon?: string;
}

export const changeQRCard = (infoQRCard: InfoQRCard) => ({
  type: CHANGE_QR_LAYOUT,
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

// init state
const initialQRCard: InfoQRCard = {
  layout: 0,
  title: '',
  icon: ''
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
    default:
      return state;
  }
};
