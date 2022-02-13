// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: {
    homepage: path(ROOTS_DASHBOARD, '/home'),
    myNFT: path(ROOTS_DASHBOARD, '/my-nft'),
    faucets: path(ROOTS_DASHBOARD, '/faucets'),
    collectionExplore: path(ROOTS_DASHBOARD, '/collection-explore')
  },
  gallery: {
    root: path(ROOTS_DASHBOARD, '/gallery'),
    universe: path(ROOTS_DASHBOARD, '/gallery/universe/1')
  },
  about: {
    learnMore: path(ROOTS_DASHBOARD, '/learn-more')
  },
  funbox: {
    cruFaucet: path(ROOTS_DASHBOARD, '/faucets/crust'),
    maticFaucet: path(ROOTS_DASHBOARD, '/faucets/polygon')
  },
  download: path(ROOTS_DASHBOARD, '/download')
};
