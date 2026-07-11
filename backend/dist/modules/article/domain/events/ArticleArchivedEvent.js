"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleArchivedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ArticleArchivedEvent extends DomainEvent_1.DomainEvent {
    constructor(articleId) {
        super(articleId);
    }
}
exports.ArticleArchivedEvent = ArticleArchivedEvent;
//# sourceMappingURL=ArticleArchivedEvent.js.map