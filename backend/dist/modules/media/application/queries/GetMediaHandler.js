"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class GetMediaHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        const media = await this.mediaRepository.findById(new UniqueEntityId_1.UniqueEntityId(query.id.value));
        if (!media) {
            return null;
        }
        return {
            id: media.id.toString(),
            fileName: media.fileName.value,
            mimeType: media.mimeType.value,
            uploadedAt: media.uploadedAt.toISOString(),
        };
    }
}
exports.GetMediaHandler = GetMediaHandler;
//# sourceMappingURL=GetMediaHandler.js.map