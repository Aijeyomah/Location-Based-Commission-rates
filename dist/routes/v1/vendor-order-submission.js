"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_order_submission_1 = require("./../../controllers/vendor-order-submission");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('', vendor_order_submission_1.orderSubmission);
exports.default = router;
//# sourceMappingURL=vendor-order-submission.js.map