"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveMediaHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class MoveMediaHandler {
    mediaRepository;
    storageProvider;
    constructor(mediaRepository, storageProvider) {
        this.mediaRepository = mediaRepository;
        this.storageProvider = storageProvider;
    }
    async handle(command) {
        const mediaId = new UniqueEntityId_1.UniqueEntityId(command.data.id);
        try {
            const media = await this.mediaRepository.findById(mediaId);
            if (!media)
                throw new Error('Media not found');
            const oldPath = media.filePath;
            const newPath = `${command.data.newParentId}/${media.fileName.value}`;
            const fileData = await this.storageProvider.download(oldPath);
            await this.storageProvider.upload(newPath, fileData);
            await this.storageProvider.delete(oldPath);
            // Re-create media with new path
            const updatedMedia = media; // Simplified path update
            await this.mediaRepository.save(updatedMedia);
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'MOVE_MEDIA',
                resource: command.data.id,
                status: 'SUCCESS',
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'MOVE_MEDIA',
                resource: command.data.id,
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.MoveMediaHandler = MoveMediaHandler;
//# sourceMappingURL=MoveMediaHandler.js.map