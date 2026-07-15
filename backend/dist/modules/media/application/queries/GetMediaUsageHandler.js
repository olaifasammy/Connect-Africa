"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaUsageHandler = void 0;
const MediaId_1 = require("../../domain/value-objects/MediaId");
class GetMediaUsageHandler {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        const usage = await this.mediaRepository.getUsage(new MediaId_1.MediaId(query.mediaId.value));
        if (!usage)
            return [];
        return [{
                mediaId: usage.mediaId.toString(),
                entityType: usage.resourceType,
                entityId: usage.resourceId.toString(),
            }];
    }
}
exports.GetMediaUsageHandler = GetMediaUsageHandler;
//# sourceMappingURL=GetMediaUsageHandler.js.map