"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationCommissionRate = void 0;
const utils_1 = require("utils");
const location_commission_rate_1 = require("./../services/location-commission-rate");
const { successResponse } = utils_1.Helper;
const { FETCH_SALE_ITEM_PRICE, FETCH_SALE_ITEM_PRICE_FAILED } = utils_1.constants;
const locationCommissionRate = new location_commission_rate_1.LocationCommissionRate;
const getLocationCommissionRate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commissionRate, saleItem } = req.body;
        const data = yield locationCommissionRate.getLocationBasedRate({ commissionRate, saleItem });
        successResponse(res, { data, message: FETCH_SALE_ITEM_PRICE });
    }
    catch (error) {
        next(new utils_1.ApiError({ message: FETCH_SALE_ITEM_PRICE_FAILED }));
    }
});
exports.getLocationCommissionRate = getLocationCommissionRate;
//# sourceMappingURL=location-commission-rate.js.map