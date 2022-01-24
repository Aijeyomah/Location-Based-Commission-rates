import { TCustomerUUID } from '../types/vendor-order-submission';
import { AxiosResponse } from 'axios';
export interface ISaleCustomerInfo extends AxiosResponse {
    billingCountry?: string;
    dateOrdered?: string;
    uuid?: string
    
}

export type TSaleItem = {
    price: number;
    saleId: number;
    properties: TSalePropertyNote[];
}

export type TSalePropertyNote = {
    name: string;
    value: string;
}

export type TCommissionRateParams = {
    saleItem: TSaleItem
    commissionRate: string
}