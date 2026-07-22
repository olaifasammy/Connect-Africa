"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationshipHandler = void 0;
const Relationship_1 = require("../../domain/entities/Relationship");
const uuid_1 = require("uuid");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class CreateRelationshipHandler {
    repository;
    ontologyService;
    eventBus;
    constructor(repository, ontologyService, eventBus) {
        this.repository = repository;
        this.ontologyService = ontologyService;
        this.eventBus = eventBus;
    }
    async handle(command) {
        await this.ontologyService.validateRelationshipType(command.relationshipTypeId, command.sourceEntityTypeId, command.targetEntityTypeId);
        const id = new RelationshipValueObjects_1.RelationshipId((0, uuid_1.v4)());
        const relationship = Relationship_1.Relationship.create(id, new RelationshipValueObjects_1.EntityId(command.sourceEntityId), new RelationshipValueObjects_1.EntityId(command.targetEntityId), new RelationshipValueObjects_1.RelationshipTypeId(command.relationshipTypeId));
        await this.repository.save(relationship);
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'CREATE_RELATIONSHIP',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: id.toString(),
            resourceType: 'RELATIONSHIP',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
        for (const event of relationship.domainEvents) {
            await this.eventBus.publish(event);
        }
        relationship.clearDomainEvents();
        return id.toString();
    }
}
exports.CreateRelationshipHandler = CreateRelationshipHandler;
//# sourceMappingURL=CreateRelationshipHandler.js.map