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
exports.orderSubmission = void 0;
const vendor_order_submission_1 = require("../services/vendor-order-submission");
const utils_1 = require("utils");
const { successResponse } = utils_1.Helper;
const { FAILED_VENDOR_ORDER, SUBMITTED_VENDOR_ORDER } = utils_1.constants;
const orderSubmission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, vendor_order_submission_1.vendorOrderSubmission)(req.body);
        successResponse(res, { data, message: SUBMITTED_VENDOR_ORDER });
    }
    catch (err) {
        next(new utils_1.ApiError({ message: FAILED_VENDOR_ORDER }));
    }
});
exports.orderSubmission = orderSubmission;
//# sourceMappingURL=vendor-order-submission.js.map