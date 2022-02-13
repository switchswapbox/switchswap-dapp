import { INFTCollection } from 'interfaces/collection';
import { API_POLYGONSCAN_URL, API_KEY_POLYGONSCAN } from 'configs/general';

const axios = require('axios');
const apiPolygonScanAdress = 'https://api.polygonscan.com/api?';

const addNewCollection = (contractAddress: string, finalResult: Array<INFTCollection>) => {
  let newCollection: INFTCollection = {
    contractAddress: contractAddress,
    tokenIn: [],
    tokenOut: []
  };
  finalResult.push(newCollection);
};

const fillCollection = (
  collection: INFTCollection,
  tokenId: string,
  from: string,
  to: string,
  walletaddress: string
) => {
  if (to === walletaddress.toLowerCase() && !collection.tokenOut.includes(tokenId)) {
    collection.tokenIn.push(tokenId);
  } else if (from === walletaddress.toLowerCase() && !collection.tokenIn.includes(tokenId)) {
    collection.tokenOut.push(tokenId);
  }
};

export async function getERC271CollectionByAddress(walletaddress: string) {
  let finalResult: Array<INFTCollection> = [];
  let params = {
    params: {
      module: 'account',
      action: 'tokennfttx',
      address: walletaddress,
      sort: 'desc',
      apikey: API_KEY_POLYGONSCAN
    }
  };

  await axios.get(API_POLYGONSCAN_URL, params).then((returnData: any) => {
    const listTransaction = returnData.data.result;
    for (let i = 0; i < listTransaction.length; i++) {
      let tokenId = listTransaction[i].tokenID;
      let from = listTransaction[i].from;
      let to = listTransaction[i].to.toLowerCase();
      let contractAddress = listTransaction[i].contractAddress;
      let contractAddressIndex = -1;
      if (finalResult.length === 0) {
        addNewCollection(contractAddress, finalResult);
        contractAddressIndex = 0;
      } else {
        let i = 0;
        let index = -1;
        for (i; i < finalResult.length; i++) {
          if (finalResult[i].contractAddress === contractAddress) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          addNewCollection(contractAddress, finalResult);
          contractAddressIndex = i;
        } else {
          contractAddressIndex = index;
        }
      }
      fillCollection(finalResult[contractAddressIndex], tokenId, from, to, walletaddress);
    }
  });
  return finalResult;
}
