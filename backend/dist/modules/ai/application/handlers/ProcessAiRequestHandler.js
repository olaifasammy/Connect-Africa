"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessAiRequestHandler = void 0;
class ProcessAiRequestHandler {
    aiGateway;
    constructor(aiGateway) {
        this.aiGateway = aiGateway;
    }
    async handle(command) {
        return this.aiGateway.processRequest(command.request);
    }
}
exports.ProcessAiRequestHandler = ProcessAiRequestHandler;
//# sourceMappingURL=ProcessAiRequestHandler.js.map