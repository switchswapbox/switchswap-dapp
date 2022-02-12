import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces';

const networkId = 4;
const rpcUrl = 'https://rinkeby.infura.io/v3/to-be-done';
const dappId = process.env.BLOCKNATIVE_API_KEY;

export function initOnboard(subscriptions: Subscriptions) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'trezor',
          appUrl: 'https://reactdemo.blocknative.com',
          email: 'aaron@blocknative.com',
          rpcUrl
        },
        {
          walletName: 'ledger',
          rpcUrl
        },
        {
          walletName: 'walletConnect',
          infuraKey: 'cea9deb6467748b0b81b920b005c10c1'
        },
        { walletName: 'cobovault', appName: 'React Demo', rpcUrl },
        { walletName: 'keystone', appName: 'React Demo', rpcUrl },
        { walletName: 'keepkey', rpcUrl },
        {
          walletName: 'lattice',
          appName: 'Onboard Demo',
          rpcUrl
        },

        // coinbase is mobile only
        { walletName: 'coinbase' },
        // walletLink is desktop support for Coinbase
        { walletName: 'walletLink', rpcUrl },

        { walletName: 'status' },
        {
          walletName: 'portis',
          apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
        },
        { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
        { walletName: 'torus' },
        { walletName: 'trust', rpcUrl },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'wallet.io', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'alphawallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'atoken' },
        { walletName: 'liquality' },
        { walletName: 'frame' },
        { walletName: 'tokenpocket', rpcUrl },
        { walletName: 'authereum', disableNotifications: true },
        { walletName: 'ownbit' },
        { walletName: 'gnosis' },
        { walletName: 'dcent' },
        { walletName: 'bitpie' },
        { walletName: 'xdefi' },
        { walletName: 'binance' },
        { walletName: 'tp' },
        { walletName: 'tally' },
        { walletName: 'blockwallet' },
        { walletName: 'mathwallet' },
        { walletName: '1inch' },
        { walletName: 'tokenary' }
        // Ronin now only works on Axie's domains and will open
        // to be used by other domains when the Ronin chain is ready"
        // Info on Ronin setup/localDev/testing https://github.com/blocknative/onboard/pull/757#issue-1071697485
        // { walletName: 'ronin' }
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' }
    ]
  });
}

export function initNotify() {
  return Notify({
    dappId,
    networkId,
    onerror: (error) => console.log(`Notify error: ${error.message}`)
  });
}
