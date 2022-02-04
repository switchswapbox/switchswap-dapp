// material

// ----------------------------------------------------------------------

const NETWORKS = [
  {
    label: 'Ethereum',
    value: 'ETH',
    icon: './static/icons/networks/ethereum.svg'
  },
  {
    label: 'Binance',
    value: 'BNB',

    icon: './static/icons/networks/binance.svg'
  },
  {
    label: 'Polygon',
    value: 'MATIC',
    icon: './static/icons/networks/polygon.svg'
  },
  {
    label: 'Avalanche',
    value: 'AVAX',
    icon: './static/icons/networks/avalanche.svg'
  }
];

export default function useNetworks() {
  const networkStorage = localStorage.getItem('currentNetwork');
  const currentNetwork =
    NETWORKS.find((_network) => _network.value === networkStorage) || NETWORKS[0];

  const handleChangeNetwork = (newNetwork: string) => {
    localStorage.setItem('currentNetwork', newNetwork);
  };

  return {
    handleChangeNetwork,
    currentNetwork,
    allNetworks: NETWORKS
  };
}
