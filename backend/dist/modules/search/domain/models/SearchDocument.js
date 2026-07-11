"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDocument = void 0;
class SearchDocument {
    id;
    resourceType;
    resourceId;
    content;
    createdAt;
    constructor(id, resourceType, resourceId, content, createdAt = new Date()) {
        this.id = id;
        this.resourceType = resourceType;
        this.resourceId = resourceId;
        this.content = content;
        this.createdAt = createdAt;
    }
}
exports.SearchDocument = SearchDocument;
//# sourceMappingURL=SearchDocument.js.map