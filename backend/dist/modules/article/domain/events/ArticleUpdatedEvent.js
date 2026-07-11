"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleUpdatedEvent extends DomainEvent_1.DomainEvent {
    articleId;
    entityIds;
    relationshipIds;
    constructor(articleId, entityIds = [], relationshipIds = []) {
        super(articleId);
        this.articleId = articleId;
        this.entityIds = entityIds;
        this.relationshipIds = relationshipIds;
    }
}
exports.ArticleUpdatedEvent = ArticleUpdatedEvent;
//# sourceMappingURL=ArticleUpdatedEvent.js.map