"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGraphEdgeHandler = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class DeleteGraphEdgeHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command, userId, ipAddress) {
        await this.repository.deleteEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType);
        AuditLogger_1.AuditLogger.log({
            status: 'SUCCESS',
            action: 'DELETE_EDGE',
            resource: `${command.sourceEntityId}-${command.targetEntityId}`,
            user: userId,
            ipAddress
        });
    }
}
exports.DeleteGraphEdgeHandler = DeleteGraphEdgeHandler;
//# sourceMappingURL=DeleteGraphEdgeHandler.js.map