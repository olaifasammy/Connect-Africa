"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyPolicy = void 0;
class PrivacyPolicy {
    static canSetPrivacy(level) {
        return ['public', 'private'].includes(level);
    }
}
exports.PrivacyPolicy = PrivacyPolicy;
//# sourceMappingURL=PrivacyPolicy.js.map