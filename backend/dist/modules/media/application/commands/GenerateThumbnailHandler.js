"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateThumbnailHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class GenerateThumbnailHandler {
    mediaRepository;
    thumbnailService;
    constructor(mediaRepository, thumbnailService) {
        this.mediaRepository = mediaRepository;
        this.thumbnailService = thumbnailService;
    }
    async handle(command) {
        const mediaId = new UniqueEntityId_1.UniqueEntityId(command.data.mediaId);
        try {
            const media = await this.mediaRepository.findById(mediaId);
            if (!media)
                throw new Error('Media not found');
            await this.thumbnailService.generate(media);
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'GENERATE_THUMBNAIL',
                resource: command.data.mediaId,
                status: 'SUCCESS',
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'GENERATE_THUMBNAIL',
                resource: command.data.mediaId,
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.GenerateThumbnailHandler = GenerateThumbnailHandler;
//# sourceMappingURL=GenerateThumbnailHandler.js.map