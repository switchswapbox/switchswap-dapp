// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`./static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  home: getIcon('ic_dashboard'),
  gallery: getIcon('ic_kanban'),
  nftMinting: getIcon('ic_analytics'),
  nftManager: getIcon('ic_banking'),
  learnMore: getIcon('ic_chat'),
  funBox: getIcon('ic_calendar')
};

const sidebarConfig = [
  {
    subheader: 'DAPP',
    items: [
      { title: 'Home', path: PATH_DASHBOARD.app.homepage, icon: ICONS.home },
      {
        title: 'NFT Gallery',
        path: PATH_DASHBOARD.gallery.root,
        icon: ICONS.gallery,
        children: [{ title: 'Universal', path: PATH_DASHBOARD.gallery.universe }]
      },
      { title: 'My NFTs', path: PATH_DASHBOARD.app.myNFT, icon: ICONS.nftManager },
      { title: 'Faucets', path: PATH_DASHBOARD.app.funBox, icon: ICONS.funBox }
    ]
  },
  {
    subheader: 'ABOUT',
    items: [
      {
        title: 'Learn More',
        path: PATH_DASHBOARD.about.learnMore,
        icon: ICONS.learnMore
      }
    ]
  }
];

export default sidebarConfig;
