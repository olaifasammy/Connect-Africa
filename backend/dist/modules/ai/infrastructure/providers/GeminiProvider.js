"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiProvider = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class GeminiProvider {
    async processRequest(request) {
        try {
            if (!request.prompt)
                throw new Error('Prompt is required');
            return {
                content: `Gemini processed: ${request.prompt}`,
                tokensUsed: 10,
                provider: 'gemini',
            };
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'AI_PROCESS_REQUEST',
                resource: 'GeminiProvider',
                status: 'FAILURE'
            });
            throw new Error(`AI Provider Failure: ${error instanceof Error ? error.message : 'Unknown'}`);
        }
    }
}
exports.GeminiProvider = GeminiProvider;
//# sourceMappingURL=GeminiProvider.js.map