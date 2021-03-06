import { IOptions, IFileOptions, IConsoleOptions, TLoggerMsg } from './../types/logger';
import fs from 'fs';
import winston from 'winston';
import config from './env';

const logDir = `${config.rootPath}/logs`;
const fileOptions: IFileOptions = {
    level: 'info,',
    filename: `${logDir}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
};

const consoleOptions: IConsoleOptions = {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
};

/**
* Used to create logger config options based on the current environment.
* @param {String} env - Node Environment value.
* @returns { Object } An object containing the logger options.
*/
const makeOptions = (env: string): IOptions => {
    let options: IOptions;
    switch (env) {
        case 'test':
            options = {
                file: {
                    ...fileOptions,
                    filename: `${logDir}/test.log`,
                    maxFiles: 50
                }
            };
            break;
        case 'production':
            options = {
                file: {
                    ...fileOptions,
                    maxFiles: 600
                },
                console: {
                    ...consoleOptions,
                    level: 'error'
                },
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


const initLogger = (env: string) => {
    const { file, console: cons } = makeOptions(env);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    const logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf((msg: TLoggerMsg): string => {
                return `[${new Date(msg.timestamp).toUTCString()}] - ${msg.level}: ${msg.message}`
            })
        ),
        transports: [
            new winston.transports.File(file),
            new winston.transports.Console(cons)
        ],
        exitOnError: false
    });
    logger.stream = {
        // @ts-ignore
        write(message): void {
            logger.info(message);
        }
    }
    return logger;
}

export default initLogger;