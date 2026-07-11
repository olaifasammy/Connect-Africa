"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresArticleRepository = void 0;
const Article_1 = require("../../domain/entities/Article");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const ArticleSeo_1 = require("../../domain/value-objects/ArticleSeo");
const EntityLink_1 = require("../../domain/value-objects/EntityLink");
const RelationshipLink_1 = require("../../domain/value-objects/RelationshipLink");
const Citation_1 = require("../../domain/value-objects/Citation");
const MediaLink_1 = require("../../domain/value-objects/MediaLink");
class PostgresArticleRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    mapRowToArticle(row) {
        return Article_1.Article.rehydrate({
            title: row.title,
            slug: row.slug,
            summary: row.summary,
            content: row.content,
            language: row.language,
            status: row.status,
            authorId: new UniqueEntityId_1.UniqueEntityId(row.author_id),
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
            publishedAt: row.published_at ? new Date(row.published_at) : undefined,
            version: row.version,
            entityLinks: (row.entity_links || []).map((l) => new EntityLink_1.EntityLink(new UniqueEntityId_1.UniqueEntityId(l.entityId))),
            relationshipLinks: (row.relationship_links || []).map((l) => new RelationshipLink_1.RelationshipLink(new UniqueEntityId_1.UniqueEntityId(l.relationshipId))),
            citations: (row.citations || []).map((c) => new Citation_1.Citation(new UniqueEntityId_1.UniqueEntityId(c.articleId), new UniqueEntityId_1.UniqueEntityId(c.sourceId), c.text, c.order)),
            mediaLinks: (row.media_links || []).map((m) => new MediaLink_1.MediaLink(m.props)),
            tags: (row.tags || []).map((t) => t),
            categories: (row.categories || []).map((c) => c),
            seo: new ArticleSeo_1.ArticleSeo(row.seo || {}),
        }, new UniqueEntityId_1.UniqueEntityId(row.id));
    }
    async findById(id) {
        const query = 'SELECT * FROM articles WHERE id = $1';
        const result = await this.db.query(query, [id.toString()]);
        if (result.rows.length === 0)
            return null;
        return this.mapRowToArticle(result.rows[0]);
    }
    async findBySlug(slug) {
        const query = 'SELECT * FROM articles WHERE slug = $1';
        const result = await this.db.query(query, [slug]);
        if (result.rows.length === 0)
            return null;
        return this.mapRowToArticle(result.rows[0]);
    }
    async save(article) {
        const query = `
      INSERT INTO articles (id, title, slug, summary, content, language, status, author_id, created_at, updated_at, version, entity_links, relationship_links, citations, media_links, tags, categories, seo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO UPDATE SET 
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        summary = EXCLUDED.summary,
        content = EXCLUDED.content,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at,
        version = EXCLUDED.version,
        entity_links = EXCLUDED.entity_links,
        relationship_links = EXCLUDED.relationship_links,
        citations = EXCLUDED.citations,
        media_links = EXCLUDED.media_links,
        tags = EXCLUDED.tags,
        categories = EXCLUDED.categories,
        seo = EXCLUDED.seo
    `;
        // Extracting nested JSON properties safely
        const entityLinks = article.entityLinks.map(l => ({ entityId: l.entityId.toString() }));
        const relationshipLinks = article.relationshipLinks.map(l => ({ relationshipId: l.relationshipId.toString() }));
        const citations = article.citations.map(c => ({ articleId: c.articleId.toString(), sourceId: c.sourceId.toString(), text: c.text, order: c.order }));
        const mediaLinks = article.mediaLinks.map(m => m.props);
        await this.db.query(query, [
            article.id.toString(),
            article.title,
            article.slug,
            article.summary,
            article.content,
            article.language,
            article.status,
            article.authorId.toString(),
            article.createdAt,
            article.updatedAt,
            article.version,
            JSON.stringify(entityLinks),
            JSON.stringify(relationshipLinks),
            JSON.stringify(citations),
            JSON.stringify(mediaLinks),
            JSON.stringify(article.tags),
            JSON.stringify(article.categories),
            JSON.stringify(article.seo.props)
        ]);
    }
    async delete(id) {
        await this.db.query('DELETE FROM articles WHERE id = $1', [id.toString()]);
    }
}
exports.PostgresArticleRepository = PostgresArticleRepository;
//# sourceMappingURL=PostgresArticleRepository.js.map