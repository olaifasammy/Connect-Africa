"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleCommand = void 0;
class CreateArticleCommand {
    title;
    summary;
    content;
    authorId;
    language;
    constructor(title, summary, content, authorId, language = 'en') {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.authorId = authorId;
        this.language = language;
    }
}
exports.CreateArticleCommand = CreateArticleCommand;
//# sourceMappingURL=CreateArticleCommand.js.map