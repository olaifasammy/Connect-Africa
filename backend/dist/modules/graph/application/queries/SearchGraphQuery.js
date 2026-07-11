"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchGraphQuery = void 0;
class SearchGraphQuery {
    label;
    limit;
    offset;
    constructor(label, limit = 20, offset = 0) {
        this.label = label;
        this.limit = limit;
        this.offset = offset;
    }
}
exports.SearchGraphQuery = SearchGraphQuery;
//# sourceMappingURL=SearchGraphQuery.js.map