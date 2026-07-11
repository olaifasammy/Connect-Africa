"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipCreatedHandler = void 0;
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
class RelationshipCreatedHandler {
    repository;
    ontologyValidator;
    constructor(repository, ontologyValidator) {
        this.repository = repository;
        this.ontologyValidator = ontologyValidator;
    }
    async handle(event) {
        await this.ontologyValidator.validateEdge(event.relationshipTypeId, event.sourceEntityId, event.targetEntityId);
        const edgeExists = await this.repository.existsEdge(event.sourceEntityId, event.targetEntityId, event.relationshipTypeId);
        if (!edgeExists) {
            const edge = new GraphEntities_1.GraphEdge(event.sourceEntityId, event.targetEntityId, event.relationshipTypeId, {});
            await this.repository.saveEdge(edge);
        }
    }
}
exports.RelationshipCreatedHandler = RelationshipCreatedHandler;
//# sourceMappingURL=RelationshipCreatedHandler.js.map