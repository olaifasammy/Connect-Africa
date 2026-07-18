"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpansionRequestService = void 0;
class ExpansionRequestService {
    aiGateway;
    constructor(aiGateway) {
        this.aiGateway = aiGateway;
    }
    async requestExpansion(content) {
        const response = await this.aiGateway.processRequest({
            prompt: `Expand the following content: ${content}`
        });
        return response.content;
    }
}
exports.ExpansionRequestService = ExpansionRequestService;
//# sourceMappingURL=ExpansionRequestService.js.map