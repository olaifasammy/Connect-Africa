"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPreviewService = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const stream_1 = require("stream");
class VideoPreviewService {
    async generatePreview(buffer) {
        return new Promise((resolve, reject) => {
            const stream = stream_1.Readable.from(buffer);
            const chunks = [];
            (0, fluent_ffmpeg_1.default)(stream)
                .screenshots({
                timestamps: ['10%'],
                filename: 'thumbnail.png',
            })
                .on('end', () => resolve(Buffer.concat(chunks)))
                .on('error', reject);
        });
    }
}
exports.VideoPreviewService = VideoPreviewService;
//# sourceMappingURL=VideoPreviewService.js.map