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
exports.post = exports.get = void 0;
const axios_1 = __importDefault(require("axios"));
const bottleneck_1 = __importDefault(require("bottleneck"));
const config_1 = __importDefault(require("../config"));
const limiter = new bottleneck_1.default({
    maxConcurrent: 1,
    minTime: 1000
});
const throttle = (params) => limiter.schedule(() => (0, axios_1.default)(params));
const get = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config_1.default.JETTI_BEARER_TOKEN}`,
        },
        url: uri,
    };
    return throttle(options);
});
exports.get = get;
const post = (uri, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'POST',
        data,
        baseURL: uri
    };
    return throttle(options);
});
exports.post = post;
//# sourceMappingURL=request.js.map