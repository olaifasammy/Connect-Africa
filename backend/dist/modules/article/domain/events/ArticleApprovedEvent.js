"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleApprovedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleApprovedEvent extends DomainEvent_1.DomainEvent {
    constructor(articleId) {
        super(articleId);
    }
}
exports.ArticleApprovedEvent = ArticleApprovedEvent;
//# sourceMappingURL=ArticleApprovedEvent.js.map