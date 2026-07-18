"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptAuditHelper = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class PromptAuditHelper {
    static logPromptChange(prompt, action) {
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: `PROMPT_${action}`,
            resource: `Prompt:${prompt.id}`,
            status: 'SUCCESS'
        });
    }
}
exports.PromptAuditHelper = PromptAuditHelper;
//# sourceMappingURL=PromptAuditHelper.js.map