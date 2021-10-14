export const CUSTOMIZE_QR_CARD = 'CUSTOMIZE_QR_CARD';
export const CARD_TITLE = 'CARD_TITLE';

export interface InfoQRCard {
  layout?: string;
  title?: string;
}

export const changeQRCard = (infoQRCard: InfoQRCard) => ({
  type: CUSTOMIZE_QR_CARD,
  infoQRCard: infoQRCard
});

export const changeCardTitle = (infoQRCard: InfoQRCard) => ({
  type: CARD_TITLE,
  infoQRCard: infoQRCard
});

// init state
const initialQRCard: InfoQRCard = {
  layout: 'svg1',
  title: ''
};

export const qrCardReducer = (
  state = initialQRCard,
  action: { type: string; infoQRCard: InfoQRCard }
) => {
  switch (action.type) {
    case CUSTOMIZE_QR_CARD:
      return {
        ...state,
        layout: action.infoQRCard.layout
      };
    case CARD_TITLE:
      return {
        ...state,
        title: action.infoQRCard.title
      };
    default:
      return state;
  }
};
