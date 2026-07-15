"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Article_1 = require("../../../../../article/domain/entities/Article");
const UniqueEntityId_1 = require("../../../../../../shared/domain/UniqueEntityId");
const ArticleStatus_1 = require("../../../../../article/domain/enums/ArticleStatus");
describe('Article', () => {
    it('should create a new article in DRAFT status', () => {
        const authorId = new UniqueEntityId_1.UniqueEntityId();
        const article = Article_1.Article.create({
            title: 'New Article',
            slug: 'new-article',
            summary: 'Summary',
            content: 'Content',
            language: 'en',
            authorId
        });
        expect(article.status).toBe(ArticleStatus_1.ArticleStatus.DRAFT);
        expect(article.title).toBe('New Article');
        expect(article.authorId).toBe(authorId);
    });
    it('should transition status from DRAFT to REVIEW', () => {
        const authorId = new UniqueEntityId_1.UniqueEntityId();
        const article = Article_1.Article.create({
            title: 'New Article',
            slug: 'new-article',
            summary: 'Summary',
            content: 'Content',
            language: 'en',
            authorId
        });
        article.submitForReview();
        expect(article.status).toBe(ArticleStatus_1.ArticleStatus.REVIEW);
    });
    it('should throw error when submitting non-draft/rejected for review', () => {
        const authorId = new UniqueEntityId_1.UniqueEntityId();
        const article = Article_1.Article.create({
            title: 'New Article',
            slug: 'new-article',
            summary: 'Summary',
            content: 'Content',
            language: 'en',
            authorId
        });
        article.submitForReview();
        expect(() => article.submitForReview()).toThrow('Only DRAFT or REJECTED articles can be submitted for review');
    });
});
//# sourceMappingURL=Article.spec.js.map