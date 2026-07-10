"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntityCommandHandler = void 0;
const Entity_1 = require("../../../entity/domain/entities/Entity");
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityName_1 = require("../../../entity/domain/value-objects/EntityName");
const EntityMetadata_1 = require("../../../entity/domain/value-objects/EntityMetadata");
const EntityValidator_1 = require("../../../entity/domain/validators/EntityValidator");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
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
        await this.auditRepository.log({
            user: command.userId,
            action: 'CREATE_ENTITY',
            resource: `entity:${entity.entityId.value}`,
            status: 'SUCCESS'
        });
    }
}
exports.CreateEntityCommandHandler = CreateEntityCommandHandler;
//# sourceMappingURL=CreateEntityCommandHandler.js.map