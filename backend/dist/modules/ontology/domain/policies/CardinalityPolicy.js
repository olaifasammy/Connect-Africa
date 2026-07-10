"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardinalityPolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class CardinalityPolicy {
    validate(count, rule) {
        if (rule.max !== null && count > rule.max) {
            throw new DomainError_1.DomainError(`Cardinality exceeded. Max allowed is ${rule.max}.`);
        }
        if (count < rule.min) {
            throw new DomainError_1.DomainError(`Cardinality not met. Min required is ${rule.min}.`);
        }
    }
}
exports.CardinalityPolicy = CardinalityPolicy;
//# sourceMappingURL=CardinalityPolicy.js.map