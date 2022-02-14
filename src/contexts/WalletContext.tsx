import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, ReactNode } from 'react';
import { SUPPORTED_CHAINS } from '../constants/chains';
import { Chain } from '../interfaces/chain';

type WalletContextProps = {
  selectedWallet: string;
  address: string;
  chain: Chain;

  onAddressChange: (address: string) => void;
  onNetworkChange: (chain: Chain) => void;
  onSelectWallet: (walletName: string) => void;
  onDisconnectWallet: () => void;
};

const initialLocalStorage = {
  selectedWallet: '',
  address: '',
  chain: { ...SUPPORTED_CHAINS[0] }
};

const initialState: WalletContextProps = {
  ...initialLocalStorage,

  onAddressChange: () => {},
  onNetworkChange: () => {},
  onSelectWallet: (walletName: string) => {},
  onDisconnectWallet: () => {}
};

const WalletContext = createContext(initialState);

type WalletProviderProps = {
  children: ReactNode;
};

function WalletProvider({ children }: WalletProviderProps) {
  const {
    value: wallet,
    setValueInLocalStorage: setWallet,
    updateValueInLocalStorage
  } = useLocalStorage('wallet', { ...initialLocalStorage });

  const onAddressChange = (address: string) => {
    setWallet({ ...wallet, address });
  };

  const onNetworkChange = (chain: Chain) => {
    if (wallet.chain?.chainId !== chain.chainId) {
      setWallet({ ...initialState, chain });

      window.location.reload();
    }
  };

  const onSelectWallet = (newWallet: string) => {
    updateValueInLocalStorage({ selectedWallet: newWallet });
  };

  const onDisconnectWallet = () => {
    updateValueInLocalStorage({
      selectedWallet: '',
      address: ''
    });
  };

  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        onAddressChange,
        onNetworkChange,
        onSelectWallet,
        onDisconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, WalletContext };
