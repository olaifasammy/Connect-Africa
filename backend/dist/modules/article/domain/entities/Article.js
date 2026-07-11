"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const ArticleStatus_1 = require("../enums/ArticleStatus");
const ArticleCreatedEvent_1 = require("../events/ArticleCreatedEvent");
const ArticleUpdatedEvent_1 = require("../events/ArticleUpdatedEvent");
const ArticleSubmittedEvent_1 = require("../events/ArticleSubmittedEvent");
const ArticleApprovedEvent_1 = require("../events/ArticleApprovedEvent");
const ArticlePublishedEvent_1 = require("../events/ArticlePublishedEvent");
const ArticleArchivedEvent_1 = require("../events/ArticleArchivedEvent");
const EntityLink_1 = require("../value-objects/EntityLink");
const RelationshipLink_1 = require("../value-objects/RelationshipLink");
const Citation_1 = require("../value-objects/Citation");
const ArticleSeo_1 = require("../value-objects/ArticleSeo");
class Article extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const article = new Article({
            ...props,
            status: ArticleStatus_1.ArticleStatus.DRAFT,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
            entityLinks: [],
            relationshipLinks: [],
            citations: [],
            mediaLinks: [],
            tags: [],
            categories: [],
            seo: new ArticleSeo_1.ArticleSeo({}),
        }, id);
        article.addDomainEvent(new ArticleCreatedEvent_1.ArticleCreatedEvent(article.id));
        return article;
    }
    static rehydrate(props, id) {
        return new Article(props, id);
    }
    get status() { return this.props.status; }
    get title() { return this.props.title; }
    get summary() { return this.props.summary; }
    get content() { return this.props.content; }
    get tags() { return this.props.tags; }
    get categories() { return this.props.categories; }
    get authorId() { return this.props.authorId; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }
    get publishedAt() { return this.props.publishedAt; }
    get version() { return this.props.version; }
    get slug() { return this.props.slug; }
    get language() { return this.props.language; }
    get entityLinks() { return this.props.entityLinks; }
    get relationshipLinks() { return this.props.relationshipLinks; }
    get citations() { return this.props.citations; }
    get mediaLinks() { return this.props.mediaLinks; }
    get seo() { return this.props.seo; }
    update(title, summary, content) {
        if (title)
            this.props.title = title;
        if (summary)
            this.props.summary = summary;
        if (content)
            this.props.content = content;
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    addTag(tag) {
        if (this.props.tags.some(t => t.value === tag.value))
            return;
        this.props.tags.push(tag);
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    addCategory(category) {
        if (this.props.categories.some(c => c.name === category.name))
            return;
        this.props.categories.push(category);
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    addMediaLink(mediaLink) {
        this.props.mediaLinks.push(mediaLink);
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    addCitation(sourceId, text) {
        const order = this.props.citations.length + 1;
        const citation = new Citation_1.Citation(this.id, sourceId, text, order);
        this.props.citations.push(citation);
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    addEntityLink(entityId) {
        if (this.props.entityLinks.some(link => link.entityId.equals(entityId))) {
            return;
        }
        this.props.entityLinks.push(new EntityLink_1.EntityLink(entityId));
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    addRelationshipLink(relationshipId) {
        if (this.props.relationshipLinks.some(link => link.relationshipId.equals(relationshipId))) {
            return;
        }
        this.props.relationshipLinks.push(new RelationshipLink_1.RelationshipLink(relationshipId));
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    restoreFromRevision(revision) {
        const snapshot = revision.contentSnapshot;
        this.props.title = snapshot.title;
        this.props.slug = snapshot.slug;
        this.props.summary = snapshot.summary;
        this.props.content = snapshot.content;
        this.props.language = snapshot.language;
        this.props.authorId = snapshot.authorId;
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    submitForReview() {
        if (this.props.status !== ArticleStatus_1.ArticleStatus.DRAFT && this.props.status !== ArticleStatus_1.ArticleStatus.REJECTED) {
            throw new Error('Only DRAFT or REJECTED articles can be submitted for review');
        }
        this.props.status = ArticleStatus_1.ArticleStatus.REVIEW;
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleSubmittedEvent_1.ArticleSubmittedEvent(this.id));
    }
    approve() {
        if (this.props.status !== ArticleStatus_1.ArticleStatus.REVIEW) {
            throw new Error('Only REVIEW articles can be approved');
        }
        this.props.status = ArticleStatus_1.ArticleStatus.APPROVED;
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleApprovedEvent_1.ArticleApprovedEvent(this.id));
    }
    reject() {
        if (this.props.status !== ArticleStatus_1.ArticleStatus.REVIEW) {
            throw new Error('Only REVIEW articles can be rejected');
        }
        this.props.status = ArticleStatus_1.ArticleStatus.REJECTED;
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleUpdatedEvent_1.ArticleUpdatedEvent(this.id));
    }
    publish() {
        if (this.props.status !== ArticleStatus_1.ArticleStatus.APPROVED) {
            throw new Error('Only APPROVED articles can be published');
        }
        this.props.status = ArticleStatus_1.ArticleStatus.PUBLISHED;
        this.props.publishedAt = new Date();
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticlePublishedEvent_1.ArticlePublishedEvent(this.id));
    }
    archive() {
        this.props.status = ArticleStatus_1.ArticleStatus.ARCHIVED;
        this.props.updatedAt = new Date();
        this.props.version += 1;
        this.addDomainEvent(new ArticleArchivedEvent_1.ArticleArchivedEvent(this.id));
    }
}
exports.Article = Article;
//# sourceMappingURL=Article.js.map