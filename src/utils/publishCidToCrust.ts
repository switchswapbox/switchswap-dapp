import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { DAPP_NAME_SUBSTRATE, CRUST_CHAIN_RPC } from '../constants';

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { typesBundleForPolkadot } = require('@crustio/type-definitions');

const publishCidToCrust = async (cid: string, fileSize: number): Promise<any> => {
  const extensions = await web3Enable(DAPP_NAME_SUBSTRATE);

  if (extensions.length === 0) {
    return false;
  }

  const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();
  let crustAccountIndex = parseInt(localStorage.getItem('selectedAccountCrustIndex') || '0', 10);

  crustAccountIndex =
    crustAccountIndex < allAccounts.length && crustAccountIndex >= 0 ? crustAccountIndex : 0;

  const account = allAccounts[crustAccountIndex];
  const injector = await web3FromSource(account.meta.source);

  const chain = new ApiPromise({
    provider: new WsProvider(CRUST_CHAIN_RPC),
    typesBundle: typesBundleForPolkadot
  });
  await chain.isReadyOrError;

  // const transferExtrinsic = chain.tx.balances.transfer(
  //   '5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ',
  //   123456
  // );

  const transferExtrinsic = chain.tx.market.placeStorageOrder(cid, fileSize, 0, '');

  const txHash = await transferExtrinsic.signAndSend(account.address, { signer: injector.signer });
  console.log(txHash);
  return true;
};

export default publishCidToCrust;
