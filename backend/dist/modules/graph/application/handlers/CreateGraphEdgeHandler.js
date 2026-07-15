"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGraphEdgeHandler = void 0;
const GraphAggregate_1 = require("../../domain/entities/GraphAggregate");
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class CreateGraphEdgeHandler {
    repository;
    ontologyValidator;
    constructor(repository, ontologyValidator) {
        this.repository = repository;
        this.ontologyValidator = ontologyValidator;
    }
    async handle(command, userId, ipAddress) {
        const sourceNode = await this.repository.findById(command.sourceEntityId);
        const targetNode = await this.repository.findById(command.targetEntityId);
        if (!sourceNode || !targetNode) {
            throw new Error('Source or target node not found');
        }
        await this.ontologyValidator.validateEdge(command.relationshipType, sourceNode.type, targetNode.type);
        await this.ontologyValidator.validateCardinality(command.relationshipType, sourceNode.type);
        const edge = new GraphEntities_1.GraphEdge(command.sourceEntityId, command.targetEntityId, command.relationshipType, {});
        const aggregate = new GraphAggregate_1.GraphAggregate([], [edge]);
        await this.repository.saveEdge(edge);
        AuditLogger_1.AuditLogger.log({
            status: 'SUCCESS',
            action: 'CREATE_EDGE',
            resource: `${command.sourceEntityId}-${command.targetEntityId}`,
            user: userId,
            ipAddress
        });
    }
}
exports.CreateGraphEdgeHandler = CreateGraphEdgeHandler;
//# sourceMappingURL=CreateGraphEdgeHandler.js.map