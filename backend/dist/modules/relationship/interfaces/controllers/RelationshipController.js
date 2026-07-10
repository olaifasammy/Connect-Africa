"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipController = void 0;
const RelationshipCommands_1 = require("../../application/commands/RelationshipCommands");
const RelationshipValidators_1 = require("../../application/validators/RelationshipValidators");
/**
 * Controller for relationship operations, including security and validation enforcement.
 */
class RelationshipController {
    relationshipService;
    constructor(relationshipService) {
        this.relationshipService = relationshipService;
    }
    /**
     * Handles creation of a new relationship.
     * Requires: Authentication, Valid DTO, Authorization.
     */
    async create(req, res) {
        const userId = req.user?.id;
        // 1. Validation (delegated to middleware, but schema available for reference)
        const validatedData = RelationshipValidators_1.CreateRelationshipSchema.parse(req.body);
        // 2. Command mapping
        const command = new RelationshipCommands_1.CreateRelationshipCommand(validatedData.sourceEntityId, validatedData.targetEntityId, validatedData.relationshipTypeId, userId);
        // 3. Service orchestration
        await this.relationshipService.createRelationship(command);
        // 4. Response
        res.status(201).json({ success: true, data: { message: 'Relationship created' } });
    }
}
exports.RelationshipController = RelationshipController;
//# sourceMappingURL=RelationshipController.js.map