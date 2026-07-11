"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGraphNodeHandler = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class DeleteGraphNodeHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command, userId, ipAddress) {
        await this.repository.deleteNode(command.entityId);
        AuditLogger_1.AuditLogger.log({
            status: 'SUCCESS',
            action: 'DELETE_NODE',
            resource: command.entityId,
            user: userId,
            ipAddress
        });
    }
}
exports.DeleteGraphNodeHandler = DeleteGraphNodeHandler;
//# sourceMappingURL=DeleteGraphNodeHandler.js.map