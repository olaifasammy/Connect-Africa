"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleCommand = void 0;
class UpdateArticleCommand {
    articleId;
    title;
    summary;
    content;
    constructor(articleId, title, summary, content) {
        this.articleId = articleId;
        this.title = title;
        this.summary = summary;
        this.content = content;
    }
}
exports.UpdateArticleCommand = UpdateArticleCommand;
//# sourceMappingURL=UpdateArticleCommand.js.map