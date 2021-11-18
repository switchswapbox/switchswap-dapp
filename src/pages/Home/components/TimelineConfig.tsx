export type TimelineType = {
  key: number;
  title: string;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
};

export const PROJECTUPDATES: TimelineType[] = [
  {
    key: 7,
    title: 'Swap NFT smart contract',
    time: 'December 2021',
    color: 'primary'
  },
  {
    key: 6,
    title: 'Release NFT Gallery',
    time: 'November 2021',
    color: 'primary'
  },
  {
    key: 5,
    title: 'Release graphic tool to design NFT cards',
    time: 'October 2021',
    color: 'secondary'
  },
  {
    key: 4,
    title: 'Minting NFT smart contract - Beta',
    time: 'October 2021',
    color: 'info'
  },
  {
    key: 3,
    title: 'Initial release',
    time: 'September 2021',
    color: 'success'
  },
  {
    key: 2,
    title: 'Joining Decentralized Cloud Foundation',
    time: 'April 2021',
    color: 'warning'
  },
  {
    key: 1,
    title: 'Team Founded',
    time: 'February 2021',
    color: 'error'
  }
];

export const ROADMAP: TimelineType[] = [
  {
    key: 1,
    title: 'Release Switchswap Beta, Minting 3 types of NFT',
    time: 'Q4 2021',
    color: 'error'
  },
  {
    key: 2,
    title: 'NFT Marketplace',
    time: 'Q1 2022',
    color: 'warning'
  },
  {
    key: 3,
    title: '6k NFTs collection',
    time: 'Q1 2022'
  },
  {
    key: 4,
    title: 'Support ERC1155',
    time: 'Q1 2022',
    color: 'success'
  },
  {
    key: 5,
    title: 'Swapping gaming items',
    time: 'Q2 2022',
    color: 'info'
  }
];
