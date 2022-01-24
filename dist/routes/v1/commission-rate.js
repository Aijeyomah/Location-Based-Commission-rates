"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_commission_rate_1 = require("controllers/location-commission-rate");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', location_commission_rate_1.getLocationCommissionRate);
exports.default = router;
//# sourceMappingURL=commission-rate.js.map