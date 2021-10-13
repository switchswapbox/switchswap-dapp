export const CHANGE_ACCOUNT_WALLET = 'CHANGE_ACCOUNT_WALLET';

export interface InfoAccountWallet {
  accountAddress: string;
  networkName: string;
}

export const changeAccountWallet = (infoAccountWallet: InfoAccountWallet) => ({
  type: CHANGE_ACCOUNT_WALLET,
  infoAccountWallet: infoAccountWallet
});

// init state
const initialAccountWallet: InfoAccountWallet = {
  accountAddress: 'Hello World',
  networkName: 'No wallet available'
};

export const accountReducer = (
  state = initialAccountWallet,
  action: { type: string; infoAccountWallet: InfoAccountWallet }
) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_WALLET:
      return {
        accountAddress: action.infoAccountWallet.accountAddress,
        networkName: action.infoAccountWallet.networkName
      };
    default:
      return state;
  }
};
