"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleCreatedEvent extends DomainEvent_1.DomainEvent {
    constructor(articleId) {
        super(articleId);
    }
}
exports.ArticleCreatedEvent = ArticleCreatedEvent;
//# sourceMappingURL=ArticleCreatedEvent.js.map