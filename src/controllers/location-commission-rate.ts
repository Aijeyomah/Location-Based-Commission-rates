import { Request, Response, NextFunction } from 'express';
import { Helper, constants , ApiError} from 'utils';
import { LocationCommissionRate } from './../services/location-commission-rate';


const { successResponse } = Helper;
const { FETCH_SALE_ITEM_PRICE, FETCH_SALE_ITEM_PRICE_FAILED} = constants;
const locationCommissionRate = new LocationCommissionRate;

export const getLocationCommissionRate = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { commissionRate, saleItem } = req.body;
       const data = await locationCommissionRate.getLocationBasedRate({commissionRate, saleItem })
       successResponse(res, { data, message: FETCH_SALE_ITEM_PRICE  });
    } catch (error) {
        next(new ApiError({ message: FETCH_SALE_ITEM_PRICE_FAILED }));
    }
}