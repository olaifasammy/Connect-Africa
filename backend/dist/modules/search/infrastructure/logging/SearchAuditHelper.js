"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAuditHelper = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class SearchAuditHelper {
    static logIndexRebuild(userId, indexName, ipAddress) {
        AuditLogger_1.AuditLogger.log({
            user: userId,
            action: 'SEARCH_INDEX_REBUILD',
            resource: `index:${indexName}`,
            status: 'SUCCESS',
            ipAddress
        });
    }
    static logBulkIndexing(userId, count, ipAddress) {
        AuditLogger_1.AuditLogger.log({
            user: userId,
            action: 'SEARCH_BULK_INDEX',
            resource: `documents:${count}`,
            status: 'SUCCESS',
            ipAddress
        });
    }
    static logAdminOperation(userId, operation, resource, ipAddress) {
        AuditLogger_1.AuditLogger.log({
            user: userId,
            action: `SEARCH_ADMIN_${operation.toUpperCase()}`,
            resource,
            status: 'SUCCESS',
            ipAddress
        });
    }
}
exports.SearchAuditHelper = SearchAuditHelper;
//# sourceMappingURL=SearchAuditHelper.js.map