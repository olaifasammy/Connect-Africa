"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGraphEdgeCommand = void 0;
class UpdateGraphEdgeCommand {
    sourceEntityId;
    targetEntityId;
    relationshipType;
    properties;
    constructor(sourceEntityId, targetEntityId, relationshipType, properties) {
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipType = relationshipType;
        this.properties = properties;
    }
}
exports.UpdateGraphEdgeCommand = UpdateGraphEdgeCommand;
//# sourceMappingURL=UpdateGraphEdgeCommand.js.map