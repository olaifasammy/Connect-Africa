"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAliasCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityAliasRemovedEvent_1 = require("../../../entity/domain/events/EntityAliasRemovedEvent");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class RemoveAliasCommandHandler {
    entityAliasRepository;
    eventBus;
    constructor(entityAliasRepository, eventBus) {
        this.entityAliasRepository = entityAliasRepository;
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
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'REMOVE_ALIAS',
            actorId: userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: entityId,
            resourceType: 'ENTITY',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.RemoveAliasCommandHandler = RemoveAliasCommandHandler;
//# sourceMappingURL=RemoveAliasCommandHandler.js.map