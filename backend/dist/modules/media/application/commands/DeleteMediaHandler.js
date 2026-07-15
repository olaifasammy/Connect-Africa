"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMediaHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class DeleteMediaHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(command) {
        const mediaId = new UniqueEntityId_1.UniqueEntityId(command.id);
        try {
            await this.mediaRepository.delete(mediaId);
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'DELETE_MEDIA',
                resource: command.id,
                status: 'SUCCESS',
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'DELETE_MEDIA',
                resource: command.id,
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.DeleteMediaHandler = DeleteMediaHandler;
//# sourceMappingURL=DeleteMediaHandler.js.map