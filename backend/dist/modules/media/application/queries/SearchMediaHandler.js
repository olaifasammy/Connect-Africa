"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMediaHandler = void 0;
class SearchMediaHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        const mediaList = await this.mediaRepository.search(query.data);
        return mediaList.map((media) => ({
            id: media.id.toString(),
            fileName: media.fileName.value,
            mimeType: media.mimeType.value,
            uploadedAt: media.uploadedAt.toISOString(),
        }));
    }
}
exports.SearchMediaHandler = SearchMediaHandler;
//# sourceMappingURL=SearchMediaHandler.js.map