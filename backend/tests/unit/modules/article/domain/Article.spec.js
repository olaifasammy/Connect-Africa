"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Article_1 = require("../../../../../src/modules/article/domain/entities/Article");
const UniqueEntityId_1 = require("../../../../../src/shared/domain/UniqueEntityId");
const ArticleStatus_1 = require("../../../../../src/modules/article/domain/enums/ArticleStatus");
describe('Article Aggregate', () => {
    it('should create a new article in DRAFT status', () => {
        const props = {
            title: 'Test Article',
            slug: 'test-article',
            summary: 'Summary',
            content: 'Content',
            language: 'en',
            authorId: new UniqueEntityId_1.UniqueEntityId(),
        };
        const article = Article_1.Article.create(props);
        expect(article.status).toBe(ArticleStatus_1.ArticleStatus.DRAFT);
    });
    it('should publish an article and set status to PUBLISHED', () => {
        const props = {
            title: 'Test Article',
            slug: 'test-article',
            summary: 'Summary',
            content: 'Content',
            language: 'en',
            authorId: new UniqueEntityId_1.UniqueEntityId(),
        };
        const article = Article_1.Article.create(props);
        article.submitForReview(); // Hypothetical method to move to review
        article.approve(); // Hypothetical method to move to approved
        article.publish();
        expect(article.status).toBe(ArticleStatus_1.ArticleStatus.PUBLISHED);
    });
});
//# sourceMappingURL=Article.spec.js.map