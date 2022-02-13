import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const NB_RETRY_GET_DATA_FROM_TOKEN_URI = 2;

export async function getDataFromTokenUri(tokenUri: string) {
  const instance = axios.create();
  retryIfRequestError(instance, { retry_time: NB_RETRY_GET_DATA_FROM_TOKEN_URI });
  const response = await instance.get(tokenUri);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Error while fetching data from token URI');
}

const WAIT_TIME_BASE_BEFORE_RETRY = 2000;
const WAIT_TIME_VARIABLE = 1000;

export function retryIfRequestError(axiosInstance: AxiosInstance, options: any) {
  const maxTime = options.retry_time || 0;
  if (!maxTime) {
    return axiosInstance;
  }
  let counter = 0;
  axiosInstance.interceptors.response.use((response) => {
    const config = response.config as AxiosRequestConfig;
    if (counter < maxTime && response?.status !== 200) {
      counter++;
      return new Promise((resolve) => {
        const waitTime = Math.floor(
          WAIT_TIME_BASE_BEFORE_RETRY + Math.random() * WAIT_TIME_VARIABLE
        );
        setTimeout(() => resolve(axiosInstance(config)), waitTime);
      });
    }
    return response;
  });
}
