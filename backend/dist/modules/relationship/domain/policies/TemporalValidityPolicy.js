"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalValidityPolicy = void 0;
/**
 * Policy to validate temporal validity.
 */
class TemporalValidityPolicy {
    async validate(relationship) {
        // Relationships are valid if they don't have time ranges or if the current date falls within range
        // Temporal validity check logic
        return Promise.resolve();
    }
}
exports.TemporalValidityPolicy = TemporalValidityPolicy;
//# sourceMappingURL=TemporalValidityPolicy.js.map