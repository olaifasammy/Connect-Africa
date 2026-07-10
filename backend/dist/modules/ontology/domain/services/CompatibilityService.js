"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompatibilityService = void 0;
const DomainError_1 = require("../errors/DomainError");
class CompatibilityService {
    propertyPolicy;
    constructor(propertyPolicy) {
        this.propertyPolicy = propertyPolicy;
    }
    checkPropertyCompatibility(source, target) {
        try {
            this.propertyPolicy.validate(source, target);
        }
        catch (error) {
            if (error instanceof DomainError_1.DomainError) {
                throw error;
            }
            throw new DomainError_1.DomainError('Incompatibility detected during validation.');
        }
    }
}
exports.CompatibilityService = CompatibilityService;
//# sourceMappingURL=CompatibilityService.js.map