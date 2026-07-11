"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGraphEdgeCommand = void 0;
class CreateGraphEdgeCommand {
    sourceEntityId;
    targetEntityId;
    relationshipType;
    constructor(sourceEntityId, targetEntityId, relationshipType) {
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipType = relationshipType;
    }
}
exports.CreateGraphEdgeCommand = CreateGraphEdgeCommand;
//# sourceMappingURL=CreateGraphEdgeCommand.js.map