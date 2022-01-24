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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationCommissionRate = void 0;
const eu_list_1 = require("./../utils/constants/eu-list");
const utils_1 = require("./../utils");
const config_1 = __importDefault(require("../config"));
const { makeError } = utils_1.Helper;
const { JETTI_SALES_URL } = config_1.default;
class LocationCommissionRate {
    getSalesItemInfo(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.get)(`${JETTI_SALES_URL}/${saleId}.json`);
        });
    }
    dateInTheLastWeekOfMonth(dateOrdered) {
        const date = dateOrdered.substring(0, 10);
        const [year, month, day] = date.split("-");
        const dateObject = new Date(+year, +month, 0);
        const daysDifference = dateObject.getDate() - (+day);
        return daysDifference <= 7 ? true : false;
    }
    getLocationBasedRate(commissionRateParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { commissionRate, saleItem } = commissionRateParams;
                console.log('initial comm', commissionRate);
                const { saleId } = saleItem;
                const data = yield this.getSalesItemInfo(saleId);
                const { billingCountry, dateOrdered } = data.data;
                console.log(billingCountry, dateOrdered);
                if (billingCountry.toLowerCase() in eu_list_1.EUROPEAN_UNION) {
                    logger.info("customer’s shipping country belongs to the European Union.");
                    commissionRate = this.increaseCommissionRateByPercentage(+commissionRate, 20);
                }
                if (this.dateInTheLastWeekOfMonth(dateOrdered)) {
                    logger.info("Sale has occurred in the last week of the month.");
                    commissionRate = this.increaseCommissionRateByPercentage(+commissionRate, 10);
                }
                if (saleItem.properties.length) {
                    logger.info("Gift Note item in the Sale Item’s properties property.");
                    const propertyContainsGiftNote = saleItem.properties.find(({ name }) => name === "Gift Note");
                    if (propertyContainsGiftNote) {
                        commissionRate = `${+commissionRate + 5.00}`;
                    }
                }
                console.log(saleItem.price, commissionRate);
                const price = saleItem.price + +commissionRate;
                return { commissionRate, price };
            }
            catch (error) {
                console.log(error);
                throw makeError({ error, status: utils_1.constants.SALE_INFORMATION_ERROR });
            }
        });
    }
    increaseCommissionRateByPercentage(prevRate, rateIncr) {
        return `${((rateIncr / 100) * prevRate) + (+prevRate)}`;
    }
}
exports.LocationCommissionRate = LocationCommissionRate;
//# sourceMappingURL=location-commission-rate.js.map