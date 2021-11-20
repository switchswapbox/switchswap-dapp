import { create } from 'ipfs-http-client';
import { IPFS_GATEWAY_W3AUTH } from '../constants';

function pinFileToW3Gateway(ipfsGateway: string, authHeader: string, file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const ipfs = create({
      url: ipfsGateway + '/api/v0',
      headers: {
        authorization: 'Basic ' + authHeader
      }
    });
    const reader = new FileReader();
    reader.onabort = () => reject('file reading was aborted');
    reader.onerror = () => reject('file reading has failed');
    reader.onload = async () => {
      const added = await ipfs.add(reader.result as ArrayBuffer);
      resolve({ cid: added.cid.toV0().toString(), name: file.name, size: added.size });
    };
    reader.readAsArrayBuffer(file);
  });
}

export default pinFileToW3Gateway;
