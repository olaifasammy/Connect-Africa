"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaByEntityHandler = void 0;
class GetMediaByEntityHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        // Assuming IMediaRepository has a method to find by entity
        // In a real DB, there would be a join table or metadata link
        const mediaList = await this.mediaRepository.findByEntity(query.entityId);
        return mediaList.map(media => ({
            id: media.id.toString(),
            fileName: media.fileName.value,
            mimeType: media.mimeType.value,
            uploadedAt: media.uploadedAt.toISOString(),
        }));
    }
}
exports.GetMediaByEntityHandler = GetMediaByEntityHandler;
//# sourceMappingURL=GetMediaByEntityHandler.js.map