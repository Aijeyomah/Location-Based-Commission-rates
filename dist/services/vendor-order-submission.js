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
exports.vendorOrderSubmission = exports.submitVendorOrder = exports.getProductCode = exports.getCustomerUUID = exports.buildVendorOrderSubmissionRequest = void 0;
const config_1 = __importDefault(require("../config"));
const request_1 = require("utils/request");
function buildVendorOrderSubmissionRequest(orderSubmissionParams, uuid) {
    const { sale, purchase, purchaseItems } = orderSubmissionParams;
    const { email } = sale.customer;
    const { dateOrdered, reference, billingFirstName, billingLastName, billingZip, billingCountry, billingAddressLineOne, billingAddressLineTwo, billingCity, shippingAddressLineOne, shippingAddressLineTwo, shippingCity, shippingCountry, shippingFirstName, shippingLastName, shippingZip, } = purchase;
    const productCode = getProductCode(purchaseItems);
    const vendorParams = {
        order: {
            orderDate: dateOrdered,
            reference,
            billing: {
                firstName: billingFirstName,
                lastName: billingLastName,
                zip: billingZip,
                country: billingCountry,
                city: billingCity,
                addressLineOne: billingAddressLineOne,
                addressLineTwo: billingAddressLineTwo
            },
            shipping: {
                firstName: shippingFirstName,
                lastName: shippingLastName,
                zip: shippingZip,
                country: shippingCountry,
                city: shippingCity,
                addressLineOne: shippingAddressLineOne,
                addressLineTwo: shippingAddressLineTwo
            },
            emailAddress: email,
            uuid,
            items: [{
                    productCode,
                    quantity: purchaseItems[0].quantity
                }]
        }
    };
    return vendorParams;
}
exports.buildVendorOrderSubmissionRequest = buildVendorOrderSubmissionRequest;
function getCustomerUUID(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = config_1.default.JETTI_CUSTOMER_UUID_URL;
        return (0, request_1.get)(`${url}/jtt-hr-customer?where[${email}]=emailaddress@domain.com`);
    });
}
exports.getCustomerUUID = getCustomerUUID;
function getProductCode(purchaseItems) {
    const productCode = !purchaseItems[0].variant.vendorSku ? purchaseItems[0].variant.sku : purchaseItems[0].variant.vendorSku;
    return productCode;
}
exports.getProductCode = getProductCode;
function submitVendorOrder(vendorOrderRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = config_1.default.JETTI_VENDOR_SUBMISSION_URL;
        return (0, request_1.post)(url, vendorOrderRequest);
    });
}
exports.submitVendorOrder = submitVendorOrder;
function vendorOrderSubmission(orderSubmissionParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sale } = orderSubmissionParams;
        const { email } = sale.customer;
        const { uuid } = yield getCustomerUUID(email);
        const vendorOrderSubmissionRequest = buildVendorOrderSubmissionRequest(orderSubmissionParams, uuid);
        const response = yield submitVendorOrder(vendorOrderSubmissionRequest);
        return response;
    });
}
exports.vendorOrderSubmission = vendorOrderSubmission;
;
//# sourceMappingURL=vendor-order-submission.js.map