"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreMediaHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class RestoreMediaHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(command) {
        const mediaId = new UniqueEntityId_1.UniqueEntityId(command.id);
        try {
            const media = await this.mediaRepository.findById(mediaId);
            if (!media) {
                throw new Error('Media not found');
            }
            // Assume restore method exists on Media or needs implementation
            // media.restore(); 
            // await this.mediaRepository.save(media);
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'RESTORE_MEDIA',
                resource: command.id,
                status: 'SUCCESS',
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'RESTORE_MEDIA',
                resource: command.id,
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.RestoreMediaHandler = RestoreMediaHandler;
//# sourceMappingURL=RestoreMediaHandler.js.map