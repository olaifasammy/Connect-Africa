"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAliasCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityAliasRemovedEvent_1 = require("../../../entity/domain/events/EntityAliasRemovedEvent");
const AuditEntry_1 = require("../../../audit/domain/aggregates/AuditEntry");
const AuditActor_1 = require("../../../audit/domain/entities/AuditActor");
const AuditResource_1 = require("../../../audit/domain/entities/AuditResource");
const AuditMetadata_1 = require("../../../audit/domain/entities/AuditMetadata");
const AuditValueObjects_1 = require("../../../audit/domain/value-objects/AuditValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RemoveAliasCommandHandler {
    entityAliasRepository;
    auditRepository;
    eventBus;
    constructor(entityAliasRepository, auditRepository, eventBus) {
        this.entityAliasRepository = entityAliasRepository;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { entityId, alias, userId } = command;
        const id = EntityId_1.EntityId.create(entityId);
        // Assuming we need to find the alias object first
        const aliases = await this.entityAliasRepository.findByEntityId(id);
        const aliasToRemove = aliases.find(a => a.name.value === alias);
        if (!aliasToRemove) {
            throw new Error('Alias not found.');
        }
        await this.entityAliasRepository.delete(aliasToRemove);
        await this.eventBus.publish(new EntityAliasRemovedEvent_1.EntityAliasRemovedEvent(id, alias));
        const auditEntry = AuditEntry_1.AuditEntry.create({
            action: 'REMOVE_ALIAS',
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
exports.RemoveAliasCommandHandler = RemoveAliasCommandHandler;
//# sourceMappingURL=RemoveAliasCommandHandler.js.map