export { LogInError, ProxyError, ApiError, MailError, CaptchaError, FileError, TimeoutError, DataInputError, AuthTokenError, BrowserError, MissingDataError, };
/** Error class cho lỗi chưa xác định */
export declare class ReportError extends Error {
    private timestamp;
    constructor(message: string);
}
/** Lỗi login */
declare class LogInError extends ReportError {
}
/** Lỗi proxy */
declare class ProxyError extends ReportError {
}
/** Lỗi call Api hoặc lỗi của api(phía server) */
declare class ApiError extends ReportError {
}
/** Lỗi liên quan đến mail */
declare class MailError extends ReportError {
}
/** Lỗi giải captcha */
declare class CaptchaError extends ReportError {
}
/** Lỗi về local file */
declare class FileError extends ReportError {
}
/** Lỗi timeout */
declare class TimeoutError extends ReportError {
}
/** Lỗi dữ liệu đầu vào (từ file account.json...) không đúng */
declare class DataInputError extends ReportError {
}
/** Lỗi thieu dữ liệu đầu vào (từ file account.json...)*/
declare class MissingDataError extends DataInputError {
}
/** Lỗi liên quan đến cookie hoặc token quá hạn (từ input) */
declare class AuthTokenError extends ReportError {
}
/** Lỗi liên quan đến trình duyệt */
declare class BrowserError extends ReportError {
}
