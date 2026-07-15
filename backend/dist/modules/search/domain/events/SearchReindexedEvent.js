"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchReindexedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SearchReindexedEvent extends DomainEvent_1.DomainEvent {
    documentId;
    constructor(documentId) {
        super(documentId);
        this.documentId = documentId;
    }
}
exports.SearchReindexedEvent = SearchReindexedEvent;
//# sourceMappingURL=SearchReindexedEvent.js.map