import { Web3Provider } from '@ethersproject/providers';
import Onboard from 'bnc-onboard';
import { API, Wallet } from 'bnc-onboard/dist/src/interfaces';
import useWallet from 'hooks/useWallet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const Web3Context = React.createContext<any>({});

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
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<Web3Provider | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<API | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<null | string>(null);
  const [connectedChainId, setConnectedChainId] = useState<number | null>(null);
  const [dump, setDump] = useState<any>(null);
  const {
    chain,
    selectedWallet: previousSelectedWallet,
    onSelectWallet,
    onDisconnectWallet
  } = useWallet();

  useEffect(() => {
    if (account && provider && connectedChainId && selectedWallet) {
      setActive(true);
      onSelectWallet(selectedWallet);
    } else {
      setActive(false);
    }
    // FIXME: adding onSelectWallet will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, provider, connectedChainId, selectedWallet]);

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
          wallet: (wallet: Wallet) => {
            if (wallet.provider) {
              setProvider(wallet.provider);
              setLibrary(new Web3Provider(wallet.provider));
              setSelectedWallet(wallet.name);
            } else {
              setProvider(undefined);
              setLibrary(undefined);
            }
          },
          address: (address) => {
            setAccount(address);
          },
          network: (network) => {
            setConnectedChainId(network);
          }
        }
      }),
    [chain.chainId, setProvider, setLibrary, setAccount]
  );

  const activate = useCallback(() => {
    setPending(true);
    onboard
      .walletSelect(previousSelectedWallet)
      .catch(console.error)
      .then((res) => res && onboard.walletCheck)
      // FIXME: setDump is just a workaround, do I need to set some sort of promise here to wait walletCheck to finish?
      .then(setDump)
      .then(() => {
        setPending(false);
      });
  }, [previousSelectedWallet, onboard]);

  const deactivate = useCallback(() => {
    setPending(true);
    onboard.walletReset();
    onDisconnectWallet();
    setSelectedWallet(null);
    onSelectWallet('');
    setPending(false);
    setActive(false);
    setAccount(undefined);
  }, [onboard, onDisconnectWallet, onSelectWallet]);

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
        connectedChainId
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
