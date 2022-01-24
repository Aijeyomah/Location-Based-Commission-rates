"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("./api.error"));
const constants_1 = __importDefault(require("../constants"));
const { INTERNAL_SERVER_ERROR, NOT_FOUND_API, AUTH_REQUIRED, INVALID_PERMISSION, INVALID_CREDENTIALS, ACCESS_REVOKED, HMAC_VALIDATION_FAILED } = constants_1.default;
exports.default = {
    serverError: new api_error_1.default({ message: INTERNAL_SERVER_ERROR, status: 500 }),
    notFoundApi: new api_error_1.default({ message: NOT_FOUND_API, status: 404 }),
    unAuthorized: new api_error_1.default({ message: INVALID_PERMISSION, status: 403 }),
    accessRevoked: new api_error_1.default({ message: ACCESS_REVOKED, status: 403 }),
};
//# sourceMappingURL=generic.js.map