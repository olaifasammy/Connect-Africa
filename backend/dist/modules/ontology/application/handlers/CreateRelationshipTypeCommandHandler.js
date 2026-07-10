"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationshipTypeCommandHandler = void 0;
class CreateRelationshipTypeCommandHandler {
    relationshipTypeService;
    constructor(relationshipTypeService) {
        this.relationshipTypeService = relationshipTypeService;
    }
    async handle(command, userId, ipAddress) {
        await this.relationshipTypeService.createRelationshipType(command.ontologyId, {
            name: command.name,
            description: command.description,
            sourceEntityTypeId: command.sourceEntityTypeId,
            targetEntityTypeId: command.targetEntityTypeId
        }, userId, ipAddress);
    }
}
exports.CreateRelationshipTypeCommandHandler = CreateRelationshipTypeCommandHandler;
//# sourceMappingURL=CreateRelationshipTypeCommandHandler.js.map