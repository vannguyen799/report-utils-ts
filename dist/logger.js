import * as winston from "winston";
const customLevels = {
    levels: {
        error: 0, // Hiển thị các lỗi khi có lỗi xảy ra
        warn: 1, // Hiển thị các cảnh báo
        success: 2, // Hiển thị các thông báo chính như: Đăng nhập thành công
        info: 3, // Hiển thị các log thông thường
        debug: 4, // Log để debug, nên disable khi chạy trên app automation
    },
};
export const LOGLEVEL = {
    error: "error",
    warn: "warn",
    success: "success",
    info: "info",
    debug: "debug",
};
export function getLogger(name = "default", level = process.env.LOG_LEVEL || "info", outputFile = undefined) {
    const colors = {
        info: "\x1b[90m", // gray
        warn: "\x1b[33m", // yellow
        error: "\x1b[31m", // red
        success: "\x1b[32m", // green
        debug: "\x1b[34m", // blue
        reset: "\x1b[0m",
    };
    const logger = winston.createLogger({
        levels: customLevels.levels,
        level,
        format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.printf(({ timestamp, level, message }) => {
            const color = colors[level] || colors.reset;
            return `${color}[${timestamp}] [${name}] [${level.toUpperCase()}]: ${message}${colors.reset}`;
        })),
        transports: [
            new winston.transports.Console(),
            ...(outputFile ? [new winston.transports.File({ filename: outputFile })] : []),
        ],
    });
    logger.success = (message) => {
        logger.log({ level: "success", message });
    };
    loggers.push(logger);
    return logger;
}
const loggers = [];
export function setLogLevel(level) {
    loggers.forEach((logger) => {
        logger.level = level;
    });
}
export const logger = getLogger("default", "info");
