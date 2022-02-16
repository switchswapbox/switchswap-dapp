import { Web3Provider } from '@ethersproject/providers';
// export function useWeb3() {
//   return useContext(Web3Context);
// }
import Onboard from 'bnc-onboard';
import useWallet from 'hooks/useWallet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
export const Web3Context = React.createContext<any>({});

const rpcUrl = `https://rinkeby.infura.io/v3/741c5f1257a24106934fe4105c784478`;

// const NetworkId = 4;

const wallets = [
  { walletName: 'metamask' },
  {
    walletName: 'walletConnect',
    infuraKey: '741c5f1257a24106934fe4105c784478'
  },
  {
    walletName: 'ledger',
    infuraKey: '741c5f1257a24106934fe4105c784478'
  }
  // { walletName: 'coinbase' },
  // { walletName: 'status' },
  // {
  //   walletName: 'lattice',
  //   appName: 'Yearn Finance',
  //   rpcUrl
  // },
  // { walletName: 'walletLink', rpcUrl },
  // { walletName: 'torus' },
  // { walletName: 'authereum', disableNotifications: true },
  // { walletName: 'trust', rpcUrl },
  // { walletName: 'opera' },
  // { walletName: 'operaTouch' },
  // { walletName: 'imToken', rpcUrl },
  // { walletName: 'meetone' }
];

const dappId = process.env.BLOCKNATIVE_API_KEY;

export function Web3ContextProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<any>(false);
  const [library, setLibrary] = useState<any>(undefined);
  const [account, setAccount] = useState<any>(undefined);
  const [provider, setProvider] = useState<any>(undefined);
  const [pending, setPending] = useState<any>(false);
  const [selectedWallet, setSelectedWallet] = useState<null | string>(null);
  const [connectedNetworkId, setConnectedNetworkId] = useState<any>(null);

  const { chain, selectedWallet: previousSelectedWallet, onSelectWallet } = useWallet();

  useEffect(() => {
    if (selectedWallet) {
      onSelectWallet(selectedWallet);
    }
  }, [selectedWallet]);

  const onboard = useMemo(
    () =>
      Onboard({
        dappId,
        hideBranding: true,
        networkId: chain.chainId,
        walletSelect: {
          wallets
        },
        subscriptions: {
          wallet: (wallet) => {
            if (wallet.provider) {
              setActive(true);
              setProvider(wallet.provider);
              setLibrary(new Web3Provider(wallet.provider));
              setSelectedWallet(wallet.name);
            } else {
              setActive(false);
              setProvider(undefined);
              setLibrary(undefined);
            }
          },
          address: (address) => {
            setAccount(address);
          }
        }
      }),
    [chain.chainId, setActive, setProvider, setLibrary, setAccount]
  );

  const activate = useCallback(() => {
    setPending(true);
    onboard
      .walletSelect(previousSelectedWallet)
      .catch(console.error)
      .then((res) => res && onboard.walletCheck)
      .then(setActive)
      .then(() => setPending(false));
  }, [onboard, setActive]);

  const deactivate = useCallback(() => {
    setPending(true);
    onboard.walletReset();
    setPending(false);
  }, [onboard, setActive]);

  return (
    <Web3Context.Provider
      value={{
        active,
        library,
        account,
        provider,
        onboard,
        activate,
        deactivate,
        pending,
        connectedNetworkId
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
