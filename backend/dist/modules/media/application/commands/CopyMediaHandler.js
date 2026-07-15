"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyMediaHandler = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class CopyMediaHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(command) {
        try {
            const media = await this.mediaRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.id));
            if (!media)
                throw new Error('Media not found');
            // Implement Copy logic (Create new entity, copy file in storage)
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'COPY_MEDIA',
                resource: media.id.toString(),
                status: 'SUCCESS',
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'COPY_MEDIA',
                resource: 'unknown',
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.CopyMediaHandler = CopyMediaHandler;
//# sourceMappingURL=CopyMediaHandler.js.map