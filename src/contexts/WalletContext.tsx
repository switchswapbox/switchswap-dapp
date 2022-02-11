import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, ReactNode } from 'react';

type WalletContextProps = {
  connectionType: string;
  address: string;
  network: string;
  onConnectionMethodChange: (connectionMethod: string) => void;
  onAddressChange: (address: string) => void;
  onNetworkChange: (network: string) => void;
};

const initialState: WalletContextProps = {
  connectionType: 'none',
  address: '',
  network: 'ethereum',
  onConnectionMethodChange: (connectionMethod: string) => {},
  onAddressChange: (address: string) => {},
  onNetworkChange: (network: string) => {}
};

const WalletContext = createContext(initialState);

type WalletProviderProps = {
  children: ReactNode;
};

function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useLocalStorage('wallet', { connectionType: '', address: '' });

  const onConnectionMethodChange = (connectionMethod: string) => {
    setWallet({ ...wallet, connectionMethod });
  };

  const onAddressChange = (address: string) => {
    setWallet({ ...wallet, address });
  };

  const onNetworkChange = (network: string) => {
    setWallet({ ...wallet, network });
  };

  return (
    <WalletContext.Provider
      value={{ ...wallet, onConnectionMethodChange, onAddressChange, onNetworkChange }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, WalletContext };
