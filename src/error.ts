export {
  LogInError,
  ProxyError,
  ApiError,
  MailError,
  CaptchaError,
  FileError,
  TimeoutError,
  DataInputError,
  AuthTokenError,
  BrowserError,
  MissingDataError,
};

/** Error class cho lỗi chưa xác định */
export class ReportError extends Error {
  private timestamp: string;
  constructor(message: string) {
    super(`${message}`);
    this.name = new.target.name;
    this.timestamp = new Date().toISOString();
  }
}

/** Lỗi login */
class LogInError extends ReportError {}

/** Lỗi proxy */
class ProxyError extends ReportError {}

/** Lỗi call Api hoặc lỗi của api(phía server) */
class ApiError extends ReportError {}

/** Lỗi liên quan đến mail */
class MailError extends ReportError {}

/** Lỗi giải captcha */
class CaptchaError extends ReportError {}

/** Lỗi về local file */
class FileError extends ReportError {}

/** Lỗi timeout */
class TimeoutError extends ReportError {}

/** Lỗi dữ liệu đầu vào (từ file account.json...) không đúng */
class DataInputError extends ReportError {}

/** Lỗi thieu dữ liệu đầu vào (từ file account.json...)*/
class MissingDataError extends DataInputError {}

/** Lỗi liên quan đến cookie hoặc token quá hạn (từ input) */
class AuthTokenError extends ReportError {}

/** Lỗi liên quan đến trình duyệt */
class BrowserError extends ReportError {}
