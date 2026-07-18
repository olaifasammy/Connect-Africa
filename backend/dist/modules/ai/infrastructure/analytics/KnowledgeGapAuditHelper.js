"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGapAuditHelper = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class KnowledgeGapAuditHelper {
    static logGap(gap) {
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: 'KNOWLEDGE_GAP_CREATED',
            resource: `KnowledgeGap:${gap.id}`,
            status: 'SUCCESS'
        });
    }
}
exports.KnowledgeGapAuditHelper = KnowledgeGapAuditHelper;
//# sourceMappingURL=KnowledgeGapAuditHelper.js.map