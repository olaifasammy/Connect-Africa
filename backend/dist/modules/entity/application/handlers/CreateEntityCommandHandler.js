"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntityCommandHandler = void 0;
const Entity_1 = require("../../../entity/domain/entities/Entity");
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityName_1 = require("../../../entity/domain/value-objects/EntityName");
const EntityMetadata_1 = require("../../../entity/domain/value-objects/EntityMetadata");
const EntityValidator_1 = require("../../../entity/domain/validators/EntityValidator");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const public_1 = require("../../../audit/public");
class CreateEntityCommandHandler {
    entityRepository;
    auditRepository;
    eventBus;
    constructor(entityRepository, auditRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { name, type, description, source, tags } = command.dto;
        const entity = Entity_1.Entity.create(EntityId_1.EntityId.create(new UniqueEntityId_1.UniqueEntityId().toString()), EntityName_1.EntityName.create(name), type, EntityMetadata_1.EntityMetadata.create({ description, source, tags: tags || [] }));
        EntityValidator_1.EntityValidator.validate(entity);
        await this.entityRepository.save(entity);
        // Publish domain events
        for (const event of entity.domainEvents) {
            await this.eventBus.publish(event);
        }
        entity.clearDomainEvents();
        // Audit logging
        const auditEntry = public_1.AuditEntry.create({
            action: 'CREATE_ENTITY',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId(entity.entityId.value),
                type: 'ENTITY'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.CreateEntityCommandHandler = CreateEntityCommandHandler;
//# sourceMappingURL=CreateEntityCommandHandler.js.map