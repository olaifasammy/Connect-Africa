"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphIntegrationService = void 0;
const CreateGraphEdgeCommand_1 = require("../../../graph/application/commands/CreateGraphEdgeCommand");
class GraphIntegrationService {
    createEdgeHandler;
    constructor(createEdgeHandler) {
        this.createEdgeHandler = createEdgeHandler;
    }
    async linkArticleToEntity(articleId, entityId) {
        const command = new CreateGraphEdgeCommand_1.CreateGraphEdgeCommand(articleId.toString(), entityId.toString(), 'MENTIONS');
        await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
    }
    async linkArticleToRelationship(articleId, relationshipId) {
        const command = new CreateGraphEdgeCommand_1.CreateGraphEdgeCommand(articleId.toString(), relationshipId.toString(), 'CITES_RELATIONSHIP');
        await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
    }
    async linkArticleToCitation(articleId, sourceId) {
        // TODO: Replace with real graph implementation when available
        const command = new CreateGraphEdgeCommand_1.CreateGraphEdgeCommand(articleId.toString(), sourceId.toString(), 'CITES_SOURCE');
        await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
    }
}
exports.GraphIntegrationService = GraphIntegrationService;
//# sourceMappingURL=GraphIntegrationService.js.map