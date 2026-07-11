"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIndexedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SearchIndexedEvent extends DomainEvent_1.DomainEvent {
    documentId;
    constructor(documentId) {
        super(documentId);
        this.documentId = documentId;
    }
}
exports.SearchIndexedEvent = SearchIndexedEvent;
//# sourceMappingURL=SearchIndexedEvent.js.map