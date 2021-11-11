import { Icon } from '@iconify/react';

export type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
  icon: JSX.Element;
};

export const PROJECTUPDATES: TimelineType[] = [
  {
    key: 7,
    title: 'Swap NFT smart contract',
    des: '',
    time: 'December 2021',
    icon: <Icon icon="fluent:people-swap-20-regular" color="black" />
  },
  {
    key: 6,
    title: 'NFT Gallery',
    des: 'Release NFT Gallery',
    time: 'November 2021',
    color: 'primary',
    icon: <Icon icon="clarity:video-gallery-line" color="white" />
  },
  {
    key: 5,
    title: 'NFT Cards',
    des: 'Release graphic tool to design NFT cards',
    time: 'October 2021',
    color: 'secondary',
    icon: <Icon icon="bi:card-checklist" color="white" />
  },
  {
    key: 4,
    title: 'Minting NFT smart contract - Beta',
    des: 'Deployed on Polygon Network',
    time: 'October 2021',
    color: 'info',
    icon: <Icon icon="healthicons:miner-worker-outline" color="white" />
  },
  {
    key: 3,
    title: 'Initial release',
    des: '',
    time: 'September 2021',
    color: 'success',
    icon: <Icon icon="whh:launch" color="white" height={16} width={16} />
  },
  {
    key: 2,
    title: 'DCF Member',
    des: 'Joining Decentralized Cloud Foundation',
    time: 'April 2021',
    color: 'warning',
    icon: <Icon icon="ri:vip-crown-2-line" color="white" />
  },
  {
    key: 1,
    title: 'Team Founded',
    des: 'Concept Design; Technologies Validation',
    time: 'February 2021',
    color: 'error',
    icon: <Icon icon="fluent:people-team-16-regular" color="white" />
  }
];

export const ROADMAP: TimelineType[] = [
  {
    key: 1,
    title: 'Release Switchswap Beta',
    des: 'Minting 3 types of NFT on Polygon, data hosted on Crust Network',
    time: 'Q4 2021',
    color: 'error',
    icon: <Icon icon="codicon:debug-start" color="white" />
  },
  {
    key: 2,
    title: 'NFT Marketplace',
    des: 'Swapping NFTs platform via smart contracts',
    time: 'Q1 2022',
    color: 'warning',
    icon: <Icon icon="icon-park-outline:weixin-market" color="white" />
  },
  {
    key: 3,
    title: '6k NFTs collection',
    des: '',
    time: 'Q1 2022',
    icon: <Icon icon="simple-icons:redmine" color="white" height={16} width={16} />
  },
  {
    key: 4,
    title: 'Support ERC1155',
    des: '',
    time: 'Q1 2022',
    color: 'success',
    icon: <Icon icon="whh:launch" color="white" height={16} width={16} />
  },
  {
    key: 5,
    title: 'Swapping gaming items',
    des: '',
    time: 'Q2 2022',
    color: 'info',
    icon: <Icon icon="maki:gaming" color="white" />
  }
];
