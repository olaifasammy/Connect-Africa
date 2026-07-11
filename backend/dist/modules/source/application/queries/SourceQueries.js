"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSourcesQuery = exports.GetSourceQuery = void 0;
class GetSourceQuery {
    sourceId;
    constructor(sourceId) {
        this.sourceId = sourceId;
    }
}
exports.GetSourceQuery = GetSourceQuery;
class SearchSourcesQuery {
    searchTerm;
    constructor(searchTerm) {
        this.searchTerm = searchTerm;
    }
}
exports.SearchSourcesQuery = SearchSourcesQuery;
//# sourceMappingURL=SourceQueries.js.map