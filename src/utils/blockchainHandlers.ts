import { SUPPORTED_CHAINS } from 'constants/chains';

export function getRpcUrl(chain: string): string {
  const chainObj = SUPPORTED_CHAINS.find((c) => c.name.toLowerCase() === chain.toLowerCase());
  return chainObj?.rpcUrl || '';
}
