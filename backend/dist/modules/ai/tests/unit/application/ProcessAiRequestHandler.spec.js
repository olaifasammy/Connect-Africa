"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessAiRequestHandler_1 = require("../../../application/handlers/ProcessAiRequestHandler");
const ProcessAiRequestCommand_1 = require("../../../application/commands/ProcessAiRequestCommand");
describe('ProcessAiRequestHandler', () => {
    it('should process request through gateway', async () => {
        const mockGateway = {
            processRequest: jest.fn().mockResolvedValue({
                content: 'mocked',
                tokensUsed: 1,
                provider: 'mock'
            })
        };
        const handler = new ProcessAiRequestHandler_1.ProcessAiRequestHandler(mockGateway);
        const request = { prompt: 'hello' };
        const command = new ProcessAiRequestCommand_1.ProcessAiRequestCommand(request);
        const result = await handler.handle(command);
        expect(result.content).toBe('mocked');
        expect(mockGateway.processRequest).toHaveBeenCalled();
    });
});
//# sourceMappingURL=ProcessAiRequestHandler.spec.js.map