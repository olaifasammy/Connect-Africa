"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSubmittedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleSubmittedEvent extends DomainEvent_1.DomainEvent {
    constructor(articleId) {
        super(articleId);
    }
}
exports.ArticleSubmittedEvent = ArticleSubmittedEvent;
//# sourceMappingURL=ArticleSubmittedEvent.js.map