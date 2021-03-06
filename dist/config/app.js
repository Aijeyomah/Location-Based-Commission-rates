"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const v1_1 = __importDefault(require("../routes/v1"));
const env_1 = __importDefault(require("./env"));
const utils_1 = require("../utils");
const { errorResponse, successResponse } = utils_1.Helper;
const { notFoundApi } = utils_1.genericErrors;
const { WELCOME, v1, JETT_RUNNING, } = utils_1.constants;
const appConfig = (app) => {
    app.use((0, morgan_1.default)('combined', { stream: logger.stream }));
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)());
    app.use((0, express_1.urlencoded)({ extended: true }));
    app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
    app.use(v1, v1_1.default);
    app.use((req, res, next) => {
        next(notFoundApi);
    });
    app.use((err, req, res, next) => errorResponse(req, res, err));
    const port = env_1.default.PORT || 3500;
    app.listen(port, () => {
        logger.info(`${JETT_RUNNING} ${port}`);
    });
};
exports.default = appConfig;
//# sourceMappingURL=app.js.map