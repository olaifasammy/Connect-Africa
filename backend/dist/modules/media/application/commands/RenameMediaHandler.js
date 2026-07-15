"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameMediaHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class RenameMediaHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(command) {
        const mediaId = new UniqueEntityId_1.UniqueEntityId(command.data.id);
        try {
            const media = await this.mediaRepository.findById(mediaId);
            if (!media) {
                throw new Error('Media not found');
            }
            media.rename(command.data.newName);
            await this.mediaRepository.save(media);
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'RENAME_MEDIA',
                resource: command.data.id,
                status: 'SUCCESS',
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'RENAME_MEDIA',
                resource: command.data.id,
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.RenameMediaHandler = RenameMediaHandler;
//# sourceMappingURL=RenameMediaHandler.js.map