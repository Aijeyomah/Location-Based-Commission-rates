import { TCustomerUUID } from './../types/vendor-order-submission';
import { ISaleCustomerInfo } from './../types/commision-rate';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Bottleneck from "bottleneck";
import request from 'request-promise-native';
import config from '../config';

type TThrottleParams = AxiosRequestConfig | ISaleCustomerInfo | TCustomerUUID
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
});

const throttle = (params)  => limiter.schedule(()=> axios(params));
export const get = async (uri: string): Promise<AxiosResponse<any, any>>  => {
    const options : AxiosRequestConfig = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.JETTI_BEARER_TOKEN}`,
        },
        url: uri,
       
    };
    return throttle(options);
};

export const post = async (uri: string, data: any): Promise<AxiosResponse<any, any>> => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        data,
        baseURL: uri
    };
    return throttle(options);
};


