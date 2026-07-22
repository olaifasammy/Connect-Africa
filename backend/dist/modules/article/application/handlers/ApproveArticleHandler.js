"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveArticleHandler = void 0;
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
const ArticleApprovedEvent_1 = require("../../domain/events/ArticleApprovedEvent");
class ApproveArticleHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const article = await this.repository.findById(command.articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        article.approve();
        await this.repository.save(article);
        // Domain event
        await this.eventBus.publish(new ArticleApprovedEvent_1.ArticleApprovedEvent(article.id));
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'ARTICLE_APPROVED',
            actorId: 'SYSTEM',
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: article.id.toString(),
            resourceType: 'ARTICLE',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.ApproveArticleHandler = ApproveArticleHandler;
//# sourceMappingURL=ApproveArticleHandler.js.map