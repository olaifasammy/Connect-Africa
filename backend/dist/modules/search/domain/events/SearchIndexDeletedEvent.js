"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIndexDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SearchIndexDeletedEvent extends DomainEvent_1.DomainEvent {
    documentId;
    constructor(documentId) {
        super(documentId);
        this.documentId = documentId;
    }
}
exports.SearchIndexDeletedEvent = SearchIndexDeletedEvent;
//# sourceMappingURL=SearchIndexDeletedEvent.js.map