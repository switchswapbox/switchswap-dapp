export interface ResponseFaucetRequest {
  message: string;
  statusCode: number;
  timeLeftInSeconds: number | null;
  txHash: string | null;
}
