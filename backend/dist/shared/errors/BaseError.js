"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    message;
    code;
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map