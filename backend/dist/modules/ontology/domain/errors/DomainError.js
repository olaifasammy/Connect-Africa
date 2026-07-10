"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class DomainError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'DOMAIN_ERROR');
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=DomainError.js.map