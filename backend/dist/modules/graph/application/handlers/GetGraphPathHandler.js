"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGraphPathHandler = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class GetGraphPathHandler {
    graphRepository;
    constructor(graphRepository) {
        this.graphRepository = graphRepository;
    }
    async handle(query, userId, ipAddress) {
        try {
            const result = await this.graphRepository.findShortestPath(query.startEntityId, query.endEntityId);
            AuditLogger_1.AuditLogger.log({ user: userId, action: 'GET_GRAPH_PATH', resource: 'GRAPH', status: 'SUCCESS', ipAddress });
            return result;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({ user: userId, action: 'GET_GRAPH_PATH', resource: 'GRAPH', status: 'FAILURE', ipAddress });
            throw error;
        }
    }
}
exports.GetGraphPathHandler = GetGraphPathHandler;
//# sourceMappingURL=GetGraphPathHandler.js.map