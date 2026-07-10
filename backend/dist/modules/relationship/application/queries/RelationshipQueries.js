"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRelationshipVersionQuery = exports.SearchRelationshipsQuery = exports.GetOutgoingRelationshipsQuery = exports.GetIncomingRelationshipsQuery = exports.GetRelationshipsForEntityQuery = exports.ListRelationshipsQuery = exports.GetRelationshipQuery = void 0;
class GetRelationshipQuery {
    id;
    constructor(id) {
        this.id = id;
    }
}
exports.GetRelationshipQuery = GetRelationshipQuery;
class ListRelationshipsQuery {
    limit;
    offset;
    constructor(limit, offset) {
        this.limit = limit;
        this.offset = offset;
    }
}
exports.ListRelationshipsQuery = ListRelationshipsQuery;
class GetRelationshipsForEntityQuery {
    entityId;
    constructor(entityId) {
        this.entityId = entityId;
    }
}
exports.GetRelationshipsForEntityQuery = GetRelationshipsForEntityQuery;
class GetIncomingRelationshipsQuery {
    targetEntityId;
    constructor(targetEntityId) {
        this.targetEntityId = targetEntityId;
    }
}
exports.GetIncomingRelationshipsQuery = GetIncomingRelationshipsQuery;
class GetOutgoingRelationshipsQuery {
    sourceEntityId;
    constructor(sourceEntityId) {
        this.sourceEntityId = sourceEntityId;
    }
}
exports.GetOutgoingRelationshipsQuery = GetOutgoingRelationshipsQuery;
class SearchRelationshipsQuery {
    query;
    constructor(query) {
        this.query = query;
    }
}
exports.SearchRelationshipsQuery = SearchRelationshipsQuery;
class GetRelationshipVersionQuery {
    relationshipId;
    versionNumber;
    constructor(relationshipId, versionNumber) {
        this.relationshipId = relationshipId;
        this.versionNumber = versionNumber;
    }
}
exports.GetRelationshipVersionQuery = GetRelationshipVersionQuery;
//# sourceMappingURL=RelationshipQueries.js.map