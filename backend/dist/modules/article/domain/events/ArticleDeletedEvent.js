"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleDeletedEvent extends DomainEvent_1.DomainEvent {
    constructor(articleId) {
        super(articleId);
    }
}
exports.ArticleDeletedEvent = ArticleDeletedEvent;
//# sourceMappingURL=ArticleDeletedEvent.js.map