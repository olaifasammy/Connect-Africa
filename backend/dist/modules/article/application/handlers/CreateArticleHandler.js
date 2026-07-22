"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleHandler = void 0;
const Article_1 = require("../../domain/entities/Article");
const public_1 = require("../../../audit/public");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class CreateArticleHandler {
    repository;
    auditRepository;
    constructor(repository, auditRepository) {
        this.repository = repository;
        this.auditRepository = auditRepository;
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
        const auditEntry = public_1.AuditEntry.create({
            action: 'CREATE_ARTICLE',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.authorId.toString()),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId(article.id.toString()),
                type: 'ARTICLE'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
        return article.id.toString();
    }
}
exports.CreateArticleHandler = CreateArticleHandler;
//# sourceMappingURL=CreateArticleHandler.js.map