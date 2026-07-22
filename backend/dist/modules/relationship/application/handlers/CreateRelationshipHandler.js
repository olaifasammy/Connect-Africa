"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationshipHandler = void 0;
const Relationship_1 = require("../../domain/entities/Relationship");
const uuid_1 = require("uuid");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
const public_1 = require("../../../audit/public");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class CreateRelationshipHandler {
    repository;
    ontologyService;
    auditRepository;
    eventBus;
    constructor(repository, ontologyService, auditRepository, eventBus) {
        this.repository = repository;
        this.ontologyService = ontologyService;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        await this.ontologyService.validateRelationshipType(command.relationshipTypeId, command.sourceEntityTypeId, command.targetEntityTypeId);
        const id = new RelationshipValueObjects_1.RelationshipId((0, uuid_1.v4)());
        const relationship = Relationship_1.Relationship.create(id, new RelationshipValueObjects_1.EntityId(command.sourceEntityId), new RelationshipValueObjects_1.EntityId(command.targetEntityId), new RelationshipValueObjects_1.RelationshipTypeId(command.relationshipTypeId));
        await this.repository.save(relationship);
        // Audit logging
        const auditEntry = public_1.AuditEntry.create({
            action: 'CREATE_RELATIONSHIP',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId(id.toString()),
                type: 'RELATIONSHIP'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
        for (const event of relationship.domainEvents) {
            await this.eventBus.publish(event);
        }
        relationship.clearDomainEvents();
        return id.toString();
    }
}
exports.CreateRelationshipHandler = CreateRelationshipHandler;
//# sourceMappingURL=CreateRelationshipHandler.js.map