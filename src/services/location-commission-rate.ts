import { ISaleCustomerInfo, TCommissionRateParams, TSaleItem } from './../types/commision-rate';
import { EUROPEAN_UNION } from './../utils/constants/eu-list';
import { get, Helper, constants } from './../utils';
import config from '../config';

const { makeError } = Helper;
const { JETTI_SALES_URL } = config;

export class LocationCommissionRate {
   
   private async getSalesItemInfo (saleId: number) {
        return get(`${JETTI_SALES_URL}/${saleId}.json`)
     }

    private dateInTheLastWeekOfMonth(dateOrdered: string): boolean {
        const date = dateOrdered.substring(0, 10)
        const [year, month, day] = date.split("-")
    
        // The Unary plus (+) operator converts its operand to a number
        const dateObject = new Date(+year, +month, 0);
        const daysDifference = dateObject.getDate() - (+day)
        return daysDifference <= 7 ? true : false
    }

   async getLocationBasedRate(commissionRateParams: TCommissionRateParams) {
       try {
        let { commissionRate, saleItem } = commissionRateParams;
        console.log('initial comm', commissionRate)
        const { saleId } = saleItem;
        const data = await this.getSalesItemInfo(saleId);
       const { billingCountry,  dateOrdered} = data.data
       
        console.log(billingCountry,  dateOrdered)
        if (billingCountry.toLowerCase() in EUROPEAN_UNION) {
            logger.info("customer’s shipping country belongs to the European Union.");
            commissionRate = this.increaseCommissionRateByPercentage(+commissionRate, 20)
        }
    
        if (this.dateInTheLastWeekOfMonth(dateOrdered)){    
            logger.info("Sale has occurred in the last week of the month.")
            commissionRate = this.increaseCommissionRateByPercentage(+commissionRate, 10);
        }
    
        if(saleItem.properties.length){
            logger.info("Gift Note item in the Sale Item’s properties property.");
           const propertyContainsGiftNote = saleItem.properties.find(({name}): boolean => name === "Gift Note");
           if(propertyContainsGiftNote){
               commissionRate = `${+commissionRate + 5.00}`;
           }
        }
        console.log(saleItem.price, commissionRate)
        const price = saleItem.price + +commissionRate;
        return { commissionRate, price }
        
       } catch (error) {
           console.log(error)
        throw makeError({ error, status: constants.SALE_INFORMATION_ERROR });
       }
        
    }

    private increaseCommissionRateByPercentage (prevRate: number, rateIncr: number): string  {
        return `${((rateIncr / 100) * prevRate) + (+prevRate)}`
    }

}

