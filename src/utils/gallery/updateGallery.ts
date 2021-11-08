import axios from 'axios';
import { ethers } from 'ethers';
import { ipfsUriToCid } from './ipfsUriToCid';
import {
  IPFS_GATEWAY_FOR_FETCHING_DATA,
  NUMBER_OF_NFT_IN_MANAGER_PAGE
} from 'assets/COMMON_VARIABLES';
import { contractAddress } from 'utils/contractAddress';
import { ABI } from 'utils/abi';

type setNftListType = React.Dispatch<
  React.SetStateAction<
    {
      tokenId: string;
      tokenURI: string;
      imageUrl: string;
      name: string;
      owner?: string;
    }[]
  >
>;

type setLoadingType = React.Dispatch<React.SetStateAction<boolean>>;

export const updateListByTokenIndex = async (
  index: number,
  contract: ethers.Contract,
  setLoading: setLoadingType,
  setNftList: setNftListType
) => {
  const tokenId = (await contract.tokenByIndex(index)).toString();
  const tokenURI = await contract.tokenURI(tokenId);
  const tokenURICid = ipfsUriToCid(tokenURI);
  if (tokenURICid) {
    const tokenURIHttp = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${tokenURICid}`;
    axios.get(tokenURIHttp).then((response) => {
      const name = response.data.name || '';
      const owner = contract.ownerOf(tokenId);
      if (response.data && response.data.image) {
        const imageCid = ipfsUriToCid(response.data.image);
        if (imageCid) {
          const imageUrl = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${imageCid}`;
          setLoading(false);
          setNftList((NftList) => {
            let addingNftIndex = 0;
            for (let nftIndex = 0; nftIndex < NftList.length; nftIndex++) {
              if (parseInt(tokenId, 10) > parseInt(NftList[nftIndex].tokenId, 10)) {
                break;
              }
              addingNftIndex++;
            }
            const newNftList = [
              ...NftList.slice(0, addingNftIndex),
              { tokenId, tokenURI, imageUrl, name, owner },
              ...NftList.slice(addingNftIndex)
            ];
            return newNftList;
          });
        }
      }
    });
  }
};

export const getNftByPage = async (
  page: number,
  setLoading: setLoadingType,
  setNftList: setNftListType
) => {
  setNftList([]);

  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const totalSupply = (await contract.totalSupply()).toString();

  const startIndex = totalSupply - 1 - (page - 1) * NUMBER_OF_NFT_IN_MANAGER_PAGE;
  const stopIndex =
    startIndex - NUMBER_OF_NFT_IN_MANAGER_PAGE > -1
      ? startIndex - NUMBER_OF_NFT_IN_MANAGER_PAGE
      : -1;

  for (let index = startIndex; index > stopIndex; index--) {
    updateListByTokenIndex(index, contract, setLoading, setNftList);
  }
};

export const updateListByTokenIndexManager = async (
  index: number,
  contract: ethers.Contract,
  selectedMetamaskAccount: string,
  setLoading: setLoadingType,
  setNftList: setNftListType
) => {
  const tokenId = (await contract.tokenOfOwnerByIndex(selectedMetamaskAccount, index)).toString();
  const tokenURI = await contract.tokenURI(tokenId);
  const tokenURICid = ipfsUriToCid(tokenURI);
  if (tokenURICid) {
    const tokenURIHttp = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${tokenURICid}`;
    axios.get(tokenURIHttp).then((response) => {
      const name = response.data.name || '';
      if (response.data && response.data.image) {
        const imageCid = ipfsUriToCid(response.data.image);
        if (imageCid) {
          const imageUrl = `${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${imageCid}`;
          setLoading(false);
          setNftList((NftList) => {
            let addingNftIndex = NftList.length;
            for (let nftIndex = NftList.length; nftIndex > 0; nftIndex--) {
              if (parseInt(tokenId, 10) > parseInt(NftList[nftIndex - 1].tokenId, 10)) {
                break;
              }
              addingNftIndex--;
            }
            const newNftList = [
              ...NftList.slice(0, addingNftIndex),
              { tokenId, tokenURI, imageUrl, name },
              ...NftList.slice(addingNftIndex)
            ];
            return newNftList;
          });
        }
      }
    });
  }
};

export const getNftByPageManager = async (
  page: number,
  selectedMetamaskAccount: string,
  setLoading: setLoadingType,
  setNftList: setNftListType
) => {
  if (ethers.utils.isAddress(selectedMetamaskAccount)) {
    setNftList([]);

    const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    const NftBalance = (await contract.balanceOf(selectedMetamaskAccount)).toString();

    const stopIndex =
      NUMBER_OF_NFT_IN_MANAGER_PAGE * page > parseInt(NftBalance, 10)
        ? parseInt(NftBalance, 10)
        : NUMBER_OF_NFT_IN_MANAGER_PAGE * page;

    for (let index = NUMBER_OF_NFT_IN_MANAGER_PAGE * (page - 1); index < stopIndex; index++) {
      updateListByTokenIndexManager(
        index,
        contract,
        selectedMetamaskAccount,
        setLoading,
        setNftList
      );
    }
  }
};
