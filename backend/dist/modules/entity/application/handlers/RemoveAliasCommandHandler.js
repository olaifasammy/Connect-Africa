"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAliasCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityAliasRemovedEvent_1 = require("../../../entity/domain/events/EntityAliasRemovedEvent");
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
        await this.auditRepository.log({
            user: userId,
            action: 'REMOVE_ALIAS',
            resource: `entity:${entityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.RemoveAliasCommandHandler = RemoveAliasCommandHandler;
//# sourceMappingURL=RemoveAliasCommandHandler.js.map