"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGraphEdgeCommand = void 0;
class DeleteGraphEdgeCommand {
    sourceEntityId;
    targetEntityId;
    relationshipType;
    constructor(sourceEntityId, targetEntityId, relationshipType) {
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipType = relationshipType;
    }
}
exports.DeleteGraphEdgeCommand = DeleteGraphEdgeCommand;
//# sourceMappingURL=DeleteGraphEdgeCommand.js.map