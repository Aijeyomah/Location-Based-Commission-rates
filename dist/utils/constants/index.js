"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eu_list_1 = require("./eu-list");
const activity_status_1 = __importDefault(require("./activity.status"));
const api_message_1 = __importDefault(require("./api.message"));
const events_constants_1 = __importDefault(require("./events.constants"));
const process_status_1 = __importDefault(require("./process.status"));
const url_constants_1 = __importDefault(require("./url.constants"));
exports.default = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, activity_status_1.default), api_message_1.default), events_constants_1.default), process_status_1.default), url_constants_1.default), eu_list_1.EUROPEAN_UNION);
//# sourceMappingURL=index.js.map