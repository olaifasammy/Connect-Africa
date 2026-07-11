"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleHandler = void 0;
const Article_1 = require("../../domain/entities/Article");
class CreateArticleHandler {
    repository;
    auditLogger;
    constructor(repository, auditLogger) {
        this.repository = repository;
        this.auditLogger = auditLogger;
    }
    async handle(command) {
        const article = Article_1.Article.create({
            title: command.title,
            summary: command.summary,
            content: command.content,
            authorId: command.authorId,
            language: command.language,
            slug: command.title.toLowerCase().replace(/ /g, '-') // Basic slugification
        });
        await this.repository.save(article);
        await this.auditLogger.log('ARTICLE_CREATED', { articleId: article.id.toString(), ...command });
        return article.id.toString();
    }
}
exports.CreateArticleHandler = CreateArticleHandler;
//# sourceMappingURL=CreateArticleHandler.js.map