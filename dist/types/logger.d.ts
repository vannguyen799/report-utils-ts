import * as winston from "winston";
declare const customLevels: {
    levels: {
        error: number;
        warn: number;
        success: number;
        info: number;
        debug: number;
    };
};
export declare const LOGLEVEL: {
    error: string;
    warn: string;
    success: string;
    info: string;
    debug: string;
};
interface CustomLogger extends winston.Logger {
    success: (message: string) => void;
}
export declare function getLogger(name?: string, level?: keyof typeof customLevels.levels, outputFile?: string | undefined): CustomLogger;
export declare function setLogLevel(level: keyof typeof customLevels.levels): void;
export declare const logger: CustomLogger;
export {};
