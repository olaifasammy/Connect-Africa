"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAliasCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityAlias_1 = require("../../../entity/domain/entities/EntityAlias");
const EntityValueObjects_1 = require("../../../entity/domain/value-objects/EntityValueObjects");
const EntityAliasAddedEvent_1 = require("../../../entity/domain/events/EntityAliasAddedEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditEntry_1 = require("../../../audit/domain/aggregates/AuditEntry");
const AuditActor_1 = require("../../../audit/domain/entities/AuditActor");
const AuditResource_1 = require("../../../audit/domain/entities/AuditResource");
const AuditMetadata_1 = require("../../../audit/domain/entities/AuditMetadata");
const AuditValueObjects_1 = require("../../../audit/domain/value-objects/AuditValueObjects");
class AddAliasCommandHandler {
    entityRepository;
    entityAliasRepository;
    auditRepository;
    eventBus;
    constructor(entityRepository, entityAliasRepository, auditRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.entityAliasRepository = entityAliasRepository;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { entityId, alias, userId } = command;
        const id = EntityId_1.EntityId.create(entityId);
        const entity = await this.entityRepository.findById(id);
        if (!entity)
            throw new Error('Entity not found.');
        const entityAlias = new EntityAlias_1.EntityAlias({
            entityId: id,
            name: EntityValueObjects_1.AliasName.create(alias),
            createdAt: new Date()
        }, new UniqueEntityId_1.UniqueEntityId());
        await this.entityAliasRepository.save(entityAlias);
        await this.eventBus.publish(new EntityAliasAddedEvent_1.EntityAliasAddedEvent(id, alias));
        const auditEntry = AuditEntry_1.AuditEntry.create({
            action: 'ADD_ALIAS',
            actor: AuditActor_1.AuditActor.create({
                userId: new AuditValueObjects_1.UserId(userId),
                actorType: 'USER',
                ipAddress: new AuditValueObjects_1.IPAddress('127.0.0.1'),
                userAgent: new AuditValueObjects_1.UserAgent('unknown')
            }),
            resource: AuditResource_1.AuditResource.create({
                id: new AuditValueObjects_1.ResourceId(entityId),
                type: 'ENTITY'
            }),
            metadata: [AuditMetadata_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new AuditValueObjects_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new AuditValueObjects_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.AddAliasCommandHandler = AddAliasCommandHandler;
//# sourceMappingURL=AddAliasCommandHandler.js.map