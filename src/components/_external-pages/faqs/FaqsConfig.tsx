export type FaqsType = {
  key: number;
  question: string;
  answer: string;
};
export const DappStructure: FaqsType[] = [
  {
    key: 1,
    question: 'What is Switchswap?',
    answer:
      'Switchswap is an open-source, decentralized protocol that allow users to mint, trade their own NFT on Polygon/Crust network.'
  },
  {
    key: 2,
    question: 'When will Switchswap launch?',
    answer:
      'Switchswap has launched Beta version, users can now mint NFT on Polygon network with a very cheap, near to zero gas fee. And there will be more unique and interesting features in the future.'
  },
  {
    key: 3,
    question: 'What is unique about Switchswap architecture?',
    answer: `At the first period, we build a platform to create/trade D-NFT on Polygon/Crust. We use the letter "D" before NFT because most NFT in the market isn't decentralized and can be easily manipulated by its creator. On switchswap, these NFT do not depend on any factor and can't be deleted by anyone. They are also compatible with big marketplaces such as Opensea.\nSwitchswap is literally unstopable. It is hosted on IPFS, based on blockchain domain, using decentralized storage to store NFTs (metadata/data)`
  }
];

export const NftExchange: FaqsType[] = [
  {
    key: 1,
    question: 'How do we trade our NFTs after minting?',
    answer:
      'You can trade NFT on marketplaces such as Opensea and Switchswap will have it own marketplace in Q1 2022, please wait for us.'
  },
  {
    key: 2,
    question: 'Which type of NFT is transferable?',
    answer:
      'All types of NFT are transferable,the author is unchangeable but the owner is. Owner identity is registered on Polygon blockchain.'
  }
];

export const NftMinting: FaqsType[] = [
  {
    key: 1,
    question: 'How many types of NFT we can mint on Switchswap?',
    answer: `There are currently 4 types of NFT that you can mint on Switchswap and more to come in the future. The current for types of NFT are as follow: 
  \nType 1: Without switchswap NFT card
  This is simply a type of NFT that other platforms offer. It is suitable for image/video/gif.
  \nType 2: With switchswap NFT Card, with author registration
  This type of NFT could be used to register assets that need to identify the author, e.g., intellectual properties, art,...
  \nType 3: With switchswap NFT Card, without author registration
  This type of NFT is used to register anonymous files which don't require author registration. The file could be image/video/article/software/etc...
  \nType 4 and more: Cryptopunks style NFT
  Cryptopunks has shown its success over the last period, but it has limitations because all data must be stored on-chain.
  At switchswap, we use an open-source avatar library that offers up to 140 million different avatars. The avatar is divided into different zones. Each zone has a category of design; by combining all these different zones randomly, we can obtain a random asset.
  We could create a collection of NFT based on that idea; all categories will be stored on Crust Network with a high renew pool to ensure the persistency of this NFT collection. More details on this type of NFT will be discussed later.
`
  },
  {
    key: 2,
    question: 'Why do we need to register the author?',
    answer:
      'To answer this question, take an example of NFT for digital pictures. The author is one factor that makes art valuable. Furthermore, the author can be used to prove the intellectual property of an asset if there is a dispute.'
  },
  {
    key: 2,
    question: 'How can I learn more about the Switchswap protocol?',
    answer: 'Visit Switchswap website, read the blog and join our community.'
  }
];
export const Others: FaqsType[] = [
  {
    key: 1,
    question: `What's the Switchswap Labs team's background?`,
    answer:
      'There are young and talented developers in our team, comming from many places in the world.'
  },
  {
    key: 2,
    question: `What is SwitchswapLabs' fundraising history and partner?`,
    answer:
      'We have raised $500k from many investors, including Polygon and Crust network. Polygon and Crust are also our major partners.'
  },
  {
    key: 3,
    question: 'Will Switchswap release it own token?',
    answer: 'We will release our token in 2022 when everything is ready.'
  },
  {
    key: 4,
    question: `What is Switchswap' plan in the future?`,
    answer:
      'NFT and metaverse is currently the hostest topic in technology, crypto world, we plan to buil our product related to these technologies.'
  }
];
