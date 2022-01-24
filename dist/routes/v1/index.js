"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commission_rate_1 = __importDefault(require("./commission-rate"));
const vendor_order_submission_1 = __importDefault(require("./vendor-order-submission"));
const router = (0, express_1.Router)();
router.use('/rates', commission_rate_1.default);
router.use('/vendor-order', vendor_order_submission_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map