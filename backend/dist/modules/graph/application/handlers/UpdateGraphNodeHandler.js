"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGraphNodeHandler = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class UpdateGraphNodeHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command, userId, ipAddress) {
        await this.repository.updateNode(command.entityId, command.metadata);
        AuditLogger_1.AuditLogger.log({
            status: 'SUCCESS',
            action: 'UPDATE_NODE',
            resource: command.entityId,
            user: userId,
            ipAddress
        });
    }
}
exports.UpdateGraphNodeHandler = UpdateGraphNodeHandler;
//# sourceMappingURL=UpdateGraphNodeHandler.js.map