"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaByArticleHandler = void 0;
class GetMediaByArticleHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        const mediaList = await this.mediaRepository.findByArticle(query.articleId);
        return mediaList.map(media => ({
            id: media.id.toString(),
            fileName: media.fileName.value,
            mimeType: media.mimeType.value,
            uploadedAt: media.uploadedAt.toISOString(),
        }));
    }
}
exports.GetMediaByArticleHandler = GetMediaByArticleHandler;
//# sourceMappingURL=GetMediaByArticleHandler.js.map