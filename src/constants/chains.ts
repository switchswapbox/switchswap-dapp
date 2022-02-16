const PROD_CHAINS = [
  {
    name: 'Ethereum',
    currencySymbol: 'ETH',
    icon: './static/icons/networks/ethereum.svg',
    chainId: 1,
    rpcUrl: '',
    blockExplorerUrl: 'https://etherscan.io'
  },
  {
    name: 'Binance',
    currencySymbol: 'BNB',
    icon: './static/icons/networks/binance.svg',
    chainId: 56,
    rpcUrl: '',
    blockExplorerUrl: 'https://bscscan.com'
  },
  {
    name: 'Polygon',
    currencySymbol: 'MATIC',
    icon: './static/icons/networks/polygon.svg',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com/',
    blockExplorerUrl: 'https://polygonscan.com'
  }
];

const TEST_CHAINS = [
  {
    name: 'Rinkeby',
    currencySymbol: 'RIN',
    icon: './static/icons/networks/ethereum.svg',
    chainId: 4,
    rpcUrl: '',
    blockExplorerUrl: 'https://rinkeby.etherscan.io'
  }
];

const staging = process.env.REACT_APP_STAGING;

export const SUPPORTED_CHAINS = staging ? [...TEST_CHAINS, ...PROD_CHAINS] : PROD_CHAINS;

export const EMPTY_CHAIN = {
  name: 'Unknown',
  currencySymbol: 'UNK',
  icon: '',
  chainId: 0,
  rpcUrl: '',
  blockExplorerUrl: ''
};
