import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EtherScanResponse, VerifyContractRequest } from './types';

const NOT_OK_STATUS = '0';

const retryWrapper = (axios: AxiosInstance, options: any) => {
    const maxTime = options.retry_time || 0;
    if (!maxTime) {
        return axios;
    }
    let counter = 0;
    axios.interceptors.response.use((response) => {
        const config = response.config as AxiosRequestConfig;
        if (counter < maxTime && response?.data?.status === NOT_OK_STATUS) {
            counter++;
            return new Promise((resolve) => {
                const waitTime = Math.floor(2000 + Math.random() * 1000);
                setTimeout(() => resolve(axios(config)), waitTime);
            });
        }
        return response;
    });
};

const statusVerificationRetryWrapper = (axios: AxiosInstance, options: any) => {
    const maxTime = options.retry_time || 0;
    if (!maxTime) {
        return axios;
    }
    let counter = 0;
    axios.interceptors.response.use((response) => {
        const config = response.config as AxiosRequestConfig;
        console.log('Response: ', response);
        if (counter < maxTime && response?.data?.status === NOT_OK_STATUS) {
            counter++;
            return new Promise((resolve) => {
                const waitTime = Math.floor(2000 + Math.random() * 1000);
                setTimeout(() => resolve(axios(config)), waitTime);
            });
        }
        return response;
    });
};

const API_ENDPOINTS: Record<string, string> = {
    '1': '//api.etherscan.io/',
    '3': '//api-ropsten.etherscan.io/api',
    '4': '//api-rinkeby.etherscan.io/api',
    '5': '//api-goerli.etherscan.io/api',
    '42': '//api-kovan.etherscan.io/api',
};

export async function verifyAndPublicContractSourceCode(
    apiKey: string,
    chainId: string,
    requestBody: VerifyContractRequest
) {
    const bodyFormData = new FormData();
    bodyFormData.append('apiKey', apiKey);
    bodyFormData.append('module', 'contract');
    bodyFormData.append('action', 'verifysourcecode');
    bodyFormData.append('contractaddress', requestBody.address);
    bodyFormData.append('sourceCode', requestBody.sourceCode);
    bodyFormData.append('codeformat', 'solidity-standard-json-input');
    bodyFormData.append('contractname', requestBody.name);
    bodyFormData.append('compilerversion', requestBody.compilerversion);
    bodyFormData.append('optimizationUsed', '0');
    bodyFormData.append('runs', '200');
    bodyFormData.append('licenseType', requestBody.licenseType);
    const instance = Axios.create();
    retryWrapper(instance, { retry_time: 20 });
    return instance.post<any, EtherScanResponse>(
        API_ENDPOINTS[chainId],
        bodyFormData
    );
}

export async function codeVerificationStatus(
    apiKey: string,
    chainId: string,
    txHash: string
) {
    const bodyFormData = new FormData();
    bodyFormData.append('apiKey', apiKey);
    bodyFormData.append('guid', txHash);
    bodyFormData.append('module', 'contract');
    bodyFormData.append('action', 'checkverifystatus');

    const instance = Axios.create();
    statusVerificationRetryWrapper(instance, { retry_time: 20 });
    return instance.post<any, EtherScanResponse>(
        API_ENDPOINTS[chainId],
        bodyFormData
    );
}
