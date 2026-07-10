"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationshipVersionCommand = exports.MergeRelationshipsCommand = exports.RestoreRelationshipCommand = exports.ArchiveRelationshipCommand = exports.PublishRelationshipCommand = exports.DeleteRelationshipCommand = exports.UpdateRelationshipCommand = exports.CreateRelationshipCommand = void 0;
class CreateRelationshipCommand {
    sourceEntityId;
    targetEntityId;
    relationshipTypeId;
    userId;
    constructor(sourceEntityId, targetEntityId, relationshipTypeId, userId) {
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipTypeId = relationshipTypeId;
        this.userId = userId;
    }
}
exports.CreateRelationshipCommand = CreateRelationshipCommand;
class UpdateRelationshipCommand {
    id;
    relationshipTypeId;
    constructor(id, relationshipTypeId) {
        this.id = id;
        this.relationshipTypeId = relationshipTypeId;
    }
}
exports.UpdateRelationshipCommand = UpdateRelationshipCommand;
class DeleteRelationshipCommand {
    id;
    constructor(id) {
        this.id = id;
    }
}
exports.DeleteRelationshipCommand = DeleteRelationshipCommand;
class PublishRelationshipCommand {
    id;
    constructor(id) {
        this.id = id;
    }
}
exports.PublishRelationshipCommand = PublishRelationshipCommand;
class ArchiveRelationshipCommand {
    id;
    constructor(id) {
        this.id = id;
    }
}
exports.ArchiveRelationshipCommand = ArchiveRelationshipCommand;
class RestoreRelationshipCommand {
    id;
    constructor(id) {
        this.id = id;
    }
}
exports.RestoreRelationshipCommand = RestoreRelationshipCommand;
class MergeRelationshipsCommand {
    sourceRelationshipId;
    targetRelationshipId;
    constructor(sourceRelationshipId, targetRelationshipId) {
        this.sourceRelationshipId = sourceRelationshipId;
        this.targetRelationshipId = targetRelationshipId;
    }
}
exports.MergeRelationshipsCommand = MergeRelationshipsCommand;
class CreateRelationshipVersionCommand {
    relationshipId;
    data;
    constructor(relationshipId, data) {
        this.relationshipId = relationshipId;
        this.data = data;
    }
}
exports.CreateRelationshipVersionCommand = CreateRelationshipVersionCommand;
//# sourceMappingURL=RelationshipCommands.js.map