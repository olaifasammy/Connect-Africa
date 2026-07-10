"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyCompatibilityPolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class PropertyCompatibilityPolicy {
    validate(source, target) {
        if (source.dataType !== target.dataType) {
            throw new DomainError_1.DomainError('Property data types are incompatible.');
        }
    }
}
exports.PropertyCompatibilityPolicy = PropertyCompatibilityPolicy;
//# sourceMappingURL=PropertyCompatibilityPolicy.js.map