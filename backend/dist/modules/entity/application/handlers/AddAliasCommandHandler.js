"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAliasCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityAlias_1 = require("../../../entity/domain/entities/EntityAlias");
const EntityValueObjects_1 = require("../../../entity/domain/value-objects/EntityValueObjects");
const EntityAliasAddedEvent_1 = require("../../../entity/domain/events/EntityAliasAddedEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
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
        await this.auditRepository.log({
            user: userId,
            action: 'ADD_ALIAS',
            resource: `entity:${entityId}`,
            status: 'SUCCESS'
        });
    }
}
exports.AddAliasCommandHandler = AddAliasCommandHandler;
//# sourceMappingURL=AddAliasCommandHandler.js.map