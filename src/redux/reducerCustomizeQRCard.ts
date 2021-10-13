const CUSTOMIZE_QR_CARD = 'CUSTOMIZE_QR_CARD';

export interface InfoQRCard {
  layout: string;
}

export const changeQRCard = (infoQRCard: InfoQRCard) => ({
  type: CUSTOMIZE_QR_CARD,
  infoQRCard: infoQRCard
});

// init state
const initialQRCard: InfoQRCard = {
  layout: 'svg1'
};

export const qrCardReducer = (
  state = initialQRCard,
  action: { type: string; infoQRCard: InfoQRCard }
) => {
  switch (action.type) {
    case CUSTOMIZE_QR_CARD:
      return {
        layout: action.infoQRCard.layout
      };
    default:
      return state;
  }
};
