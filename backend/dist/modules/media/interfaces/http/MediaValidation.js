"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMediaSchema = void 0;
const zod_1 = require("zod");
exports.UploadMediaSchema = zod_1.z.object({
    fileName: zod_1.z.string().min(1),
    mimeType: zod_1.z.string().min(1),
});
//# sourceMappingURL=MediaValidation.js.map