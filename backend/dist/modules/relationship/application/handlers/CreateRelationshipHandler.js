"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationshipHandler = void 0;
const Relationship_1 = require("../../domain/entities/Relationship");
const uuid_1 = require("uuid");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
class CreateRelationshipHandler {
    repository;
    ontologyService;
    auditLogger;
    eventBus;
    constructor(repository, ontologyService, auditLogger, eventBus) {
        this.repository = repository;
        this.ontologyService = ontologyService;
        this.auditLogger = auditLogger;
        this.eventBus = eventBus;
    }
    async handle(command) {
        await this.ontologyService.validateRelationshipType(command.relationshipTypeId);
        const id = new RelationshipValueObjects_1.RelationshipId((0, uuid_1.v4)());
        const relationship = Relationship_1.Relationship.create(id, new RelationshipValueObjects_1.EntityId(command.sourceEntityId), new RelationshipValueObjects_1.EntityId(command.targetEntityId), new RelationshipValueObjects_1.RelationshipTypeId(command.relationshipTypeId));
        await this.repository.save(relationship);
        await this.auditLogger.log('RELATIONSHIP_CREATED', { relationshipId: id.toString(), ...command });
        for (const event of relationship.domainEvents) {
            await this.eventBus.publish(event);
        }
        relationship.clearDomainEvents();
        return id.toString();
    }
}
exports.CreateRelationshipHandler = CreateRelationshipHandler;
//# sourceMappingURL=CreateRelationshipHandler.js.map