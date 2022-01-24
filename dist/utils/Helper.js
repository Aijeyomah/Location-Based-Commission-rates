"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const generic_1 = __importDefault(require("./error/generic"));
const db_error_1 = __importDefault(require("./error/db.error"));
const module_error_1 = __importDefault(require("./error/module.error"));
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants_1.default;
const { serverError } = generic_1.default;
class Helper {
    static moduleErrLogMessager(error) {
        return logger.error(`${error.status} - ${error.name} - ${error.message}`);
    }
    static apiErrLogMessager(error, req) {
        return logger.error(`${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    static successResponse(res, { data, message = SUCCESS_RESPONSE, code = 200 }) {
        return res.status(code).json({
            status: SUCCESS,
            message,
            data
        });
    }
    static errorResponse(req, res, error) {
        const aggregateError = Object.assign(Object.assign({}, serverError), error);
        Helper.apiErrLogMessager(aggregateError, req);
        return res.status(aggregateError.status).json({
            status: FAIL,
            message: aggregateError.message,
            errors: aggregateError.errors
        });
    }
    static makeError(options, isDBError = true) {
        const { error, errors, status } = options;
        let err;
        const { message } = error;
        if (isDBError) {
            err = new db_error_1.default({
                status,
                message
            });
        }
        else {
            err = new module_error_1.default({
                message,
                status
            });
        }
        if (errors)
            err.errors = errors;
        Helper.moduleErrLogMessager(err);
        return err;
    }
}
exports.default = Helper;
//# sourceMappingURL=Helper.js.map