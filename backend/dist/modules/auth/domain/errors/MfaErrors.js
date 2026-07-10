"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaAuthenticationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class MfaAuthenticationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_MFA_AUTH');
    }
}
exports.MfaAuthenticationError = MfaAuthenticationError;
//# sourceMappingURL=MfaErrors.js.map