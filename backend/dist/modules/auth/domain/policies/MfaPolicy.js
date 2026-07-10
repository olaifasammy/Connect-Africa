"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaPolicy = void 0;
class MfaPolicy {
    static canEnableMfa(isAlreadyEnabled) {
        return !isAlreadyEnabled;
    }
    static canDisableMfa(isAlreadyEnabled) {
        return isAlreadyEnabled;
    }
}
exports.MfaPolicy = MfaPolicy;
//# sourceMappingURL=MfaPolicy.js.map