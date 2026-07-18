"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderAuditHelper = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class ProviderAuditHelper {
    static logProviderChange(provider, action) {
        AuditLogger_1.AuditLogger.log({
            user: 'admin',
            action: `PROVIDER_${action}`,
            resource: `Provider:${provider.id}`,
            status: 'SUCCESS'
        });
    }
}
exports.ProviderAuditHelper = ProviderAuditHelper;
//# sourceMappingURL=ProviderAuditHelper.js.map