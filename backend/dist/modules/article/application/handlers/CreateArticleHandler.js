"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleHandler = void 0;
const Article_1 = require("../../domain/entities/Article");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
const ArticleCreatedEvent_1 = require("../../domain/events/ArticleCreatedEvent");
class CreateArticleHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const article = Article_1.Article.create({
            title: command.title,
            summary: command.summary,
            content: command.content,
            authorId: command.authorId,
            language: command.language,
            slug: command.title.toLowerCase().replace(/ /g, '-')
        });
        await this.repository.save(article);
        // Domain event
        await this.eventBus.publish(new ArticleCreatedEvent_1.ArticleCreatedEvent(article.id));
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'CREATE_ARTICLE',
            actorId: command.authorId.toString(),
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: article.id.toString(),
            resourceType: 'ARTICLE',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
        return article.id.toString();
    }
}
exports.CreateArticleHandler = CreateArticleHandler;
//# sourceMappingURL=CreateArticleHandler.js.map