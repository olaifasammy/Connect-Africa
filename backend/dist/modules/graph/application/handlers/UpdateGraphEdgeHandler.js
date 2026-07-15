"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGraphEdgeHandler = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class UpdateGraphEdgeHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command, userId, ipAddress) {
        await this.repository.runInTransaction(async (client) => {
            // In a real implementation, we would load the aggregate here.
            // For now, we update the repository directly to perform the update.
            await this.repository.updateEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType, command.properties);
            AuditLogger_1.AuditLogger.log({
                status: 'SUCCESS',
                action: 'UPDATE_EDGE',
                resource: `${command.sourceEntityId}-${command.targetEntityId}`,
                user: userId,
                ipAddress
            });
        });
    }
}
exports.UpdateGraphEdgeHandler = UpdateGraphEdgeHandler;
//# sourceMappingURL=UpdateGraphEdgeHandler.js.map