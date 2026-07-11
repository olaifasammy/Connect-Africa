"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleSchema = exports.CreateArticleSchema = void 0;
const zod_1 = require("zod");
exports.CreateArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(5).max(255),
    summary: zod_1.z.string().min(10).max(500),
    content: zod_1.z.string().min(50),
    authorId: zod_1.z.string().uuid(),
});
exports.UpdateArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(5).max(255).optional(),
    summary: zod_1.z.string().min(10).max(500).optional(),
    content: zod_1.z.string().min(50).optional(),
});
//# sourceMappingURL=ArticleValidators.js.map