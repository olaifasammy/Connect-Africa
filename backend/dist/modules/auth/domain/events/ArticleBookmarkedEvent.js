"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleBookmarkedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleBookmarkedEvent extends DomainEvent_1.DomainEvent {
    userId;
    articleId;
    constructor(userId, articleId) {
        super(userId);
        this.userId = userId;
        this.articleId = articleId;
    }
}
exports.ArticleBookmarkedEvent = ArticleBookmarkedEvent;
//# sourceMappingURL=ArticleBookmarkedEvent.js.map