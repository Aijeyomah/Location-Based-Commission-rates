"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const winston_1 = __importDefault(require("winston"));
const env_1 = __importDefault(require("./env"));
const logDir = `${env_1.default.rootPath}/logs`;
const fileOptions = {
    level: 'info,',
    filename: `${logDir}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
};
const consoleOptions = {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
};
const makeOptions = (env) => {
    let options;
    switch (env) {
        case 'test':
            options = {
                file: Object.assign(Object.assign({}, fileOptions), { filename: `${logDir}/test.log`, maxFiles: 50 })
            };
            break;
        case 'production':
            options = {
                file: Object.assign(Object.assign({}, fileOptions), { maxFiles: 600 }),
                console: Object.assign(Object.assign({}, consoleOptions), { level: 'error' }),
            };
            break;
        default:
            options = {
                file: fileOptions,
                console: consoleOptions
            };
    }
    return options;
};
const initLogger = (env) => {
    const { file, console: cons } = makeOptions(env);
    if (!fs_1.default.existsSync(logDir))
        fs_1.default.mkdirSync(logDir);
    const logger = winston_1.default.createLogger({
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.printf((msg) => {
            return `[${new Date(msg.timestamp).toUTCString()}] - ${msg.level}: ${msg.message}`;
        })),
        transports: [
            new winston_1.default.transports.File(file),
            new winston_1.default.transports.Console(cons)
        ],
        exitOnError: false
    });
    logger.stream = {
        write(message) {
            logger.info(message);
        }
    };
    return logger;
};
exports.default = initLogger;
//# sourceMappingURL=logger.js.map