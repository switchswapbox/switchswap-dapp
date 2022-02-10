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
    funBox: path(ROOTS_DASHBOARD, '/fun-box'),
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
    cruFaucet: path(ROOTS_DASHBOARD, '/funbox/cru-faucet'),
    maticFaucet: path(ROOTS_DASHBOARD, '/funbox/matic-faucet')
  },
  download: path(ROOTS_DASHBOARD, '/download')
};
