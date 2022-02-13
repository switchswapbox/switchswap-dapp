import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, ReactNode } from 'react';
import { Chain } from 'interfaces/chain';

interface WalletContextProps extends Chain {
  connectionMethod: string;
  address: '';
  isReady: boolean;
  onConnectionMethodChange: (connectionMethod: string) => void;
  onAddressChange: (address: string) => void;
  onChainChange: (chain: Chain) => void;
}

const initialState: WalletContextProps = {
  connectionMethod: 'none',
  address: '',
  name: 'Ethereum',
  currencySymbol: 'ETH',
  icon: './static/icons/networks/ethereum.svg',
  chainId: 1,
  rpcUrl: '',
  blockExplorerUrl: 'https://etherscan.io/',
  isReady: false,
  onConnectionMethodChange: () => {},
  onAddressChange: () => {},
  onChainChange: () => {}
};

const WalletContext = createContext(initialState);

type WalletProviderProps = {
  children: ReactNode;
};

function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useLocalStorage('wallet', {
    connectionMethod: initialState.connectionMethod,
    address: initialState.address,
    name: initialState.name,
    currencySymbol: initialState.currencySymbol,
    chainId: initialState.chainId,
    rpcUrl: initialState.rpcUrl,
    blockExplorerUrl: initialState.blockExplorerUrl,
    isReady: initialState.isReady
  });

  const onConnectionMethodChange = (connectionMethod: string) => {
    setWallet({ ...wallet, connectionMethod });
  };

  const onAddressChange = (address: string) => {
    setWallet({ ...wallet, address });
  };

  const onChainChange = (chain: Chain) => {
    setWallet({ ...wallet, ...chain });
  };

  return (
    <WalletContext.Provider
      value={{ ...wallet, onConnectionMethodChange, onAddressChange, onChainChange }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, WalletContext };
