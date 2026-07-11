"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceGraphIntegrationService = void 0;
const CreateGraphEdgeCommand_1 = require("../../../graph/application/commands/CreateGraphEdgeCommand");
class SourceGraphIntegrationService {
    createEdgeHandler;
    constructor(createEdgeHandler) {
        this.createEdgeHandler = createEdgeHandler;
    }
    async linkSourceToNode(sourceId, nodeId) {
        const command = new CreateGraphEdgeCommand_1.CreateGraphEdgeCommand(sourceId.toString(), nodeId.toString(), 'SOURCE_OF_NODE');
        await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
    }
    async linkSourceToEdge(sourceId, edgeId) {
        const command = new CreateGraphEdgeCommand_1.CreateGraphEdgeCommand(sourceId.toString(), edgeId.toString(), 'SOURCE_OF_EDGE');
        await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
    }
}
exports.SourceGraphIntegrationService = SourceGraphIntegrationService;
//# sourceMappingURL=SourceGraphIntegrationService.js.map