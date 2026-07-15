"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const MediaValidation_1 = require("./MediaValidation");
class MediaController {
    uploadMediaHandler;
    attachMediaHandler;
    constructor(uploadMediaHandler, attachMediaHandler) {
        this.uploadMediaHandler = uploadMediaHandler;
        this.attachMediaHandler = attachMediaHandler;
    }
    async upload(req, res) {
        const validation = MediaValidation_1.UploadMediaSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ success: false, errors: validation.error.format() });
            return;
        }
        if (!req.file) {
            res.status(400).json({ success: false, errors: { _errors: ['No file uploaded'] } });
            return;
        }
        const result = await this.uploadMediaHandler.handle({
            data: {
                fileName: validation.data.fileName,
                mimeType: validation.data.mimeType,
                fileBuffer: req.file.buffer,
            },
        });
        res.status(201).json({ success: true, data: result });
    }
    async attach(req, res) {
        const mediaId = req.params.mediaId;
        const { resourceType, resourceId } = req.body;
        await this.attachMediaHandler.handle({
            data: { mediaId, resourceType, resourceId }
        });
        res.status(200).json({ success: true });
    }
}
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map