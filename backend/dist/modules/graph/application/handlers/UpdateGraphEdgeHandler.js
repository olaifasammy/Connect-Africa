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
        // Edge properties update logic (placeholder for actual projection update if supported)
        // For now, logged as successful operation.
        AuditLogger_1.AuditLogger.log({
            status: 'SUCCESS',
            action: 'UPDATE_EDGE',
            resource: `${command.sourceEntityId}-${command.targetEntityId}`,
            user: userId,
            ipAddress
        });
    }
}
exports.UpdateGraphEdgeHandler = UpdateGraphEdgeHandler;
//# sourceMappingURL=UpdateGraphEdgeHandler.js.map