"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensitiveDataMaskingPolicy = void 0;
class SensitiveDataMaskingPolicy {
    static mask(data) {
        if (typeof data !== 'object' || data === null)
            return data;
        const masked = { ...data };
        const sensitiveFields = ['password', 'token', 'secret'];
        for (const field of sensitiveFields) {
            if (masked[field])
                masked[field] = '****';
        }
        return masked;
    }
}
exports.SensitiveDataMaskingPolicy = SensitiveDataMaskingPolicy;
//# sourceMappingURL=SensitiveDataMaskingPolicy.js.map