export const CHANGE_ACCOUNT_WALLET = 'CHANGE_ACCOUNT_WALLET';

export interface InfoAccountWallet {
  accountAddress: string;
  networkName: string;
}

export const changeAccountWallet = (state: InfoAccountWallet) => ({
  type: CHANGE_ACCOUNT_WALLET,
  state: state
});

// init state
const initialAccountWallet: InfoAccountWallet = {
  accountAddress: 'Hello World',
  networkName: 'No wallet available'
};

export const reducerSelectAccount = (
  state = initialAccountWallet,
  action: { type: string; state: InfoAccountWallet }
) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_WALLET:
      return {
        accountAddress: action.state.accountAddress,
        networkName: action.state.networkName
      };
    default:
      return state;
  }
};
