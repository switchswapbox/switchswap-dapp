export const ipfsUriToCid = (ipfsUrl: string) => {
  const CidSearch = ipfsUrl.match(/(Qm[\w]+)/);
  if (CidSearch) {
    return CidSearch[1];
  } else return null;
};
