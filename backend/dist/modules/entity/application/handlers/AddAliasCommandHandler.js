"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAliasCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityAlias_1 = require("../../../entity/domain/entities/EntityAlias");
const EntityValueObjects_1 = require("../../../entity/domain/value-objects/EntityValueObjects");
const EntityAliasAddedEvent_1 = require("../../../entity/domain/events/EntityAliasAddedEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class AddAliasCommandHandler {
    entityRepository;
    entityAliasRepository;
    eventBus;
    constructor(entityRepository, entityAliasRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.entityAliasRepository = entityAliasRepository;
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
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'ADD_ALIAS',
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
exports.AddAliasCommandHandler = AddAliasCommandHandler;
//# sourceMappingURL=AddAliasCommandHandler.js.map