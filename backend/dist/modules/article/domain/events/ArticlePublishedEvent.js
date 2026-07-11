"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlePublishedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticlePublishedEvent extends DomainEvent_1.DomainEvent {
    constructor(articleId) {
        super(articleId);
    }
}
exports.ArticlePublishedEvent = ArticlePublishedEvent;
//# sourceMappingURL=ArticlePublishedEvent.js.map