"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntityVersionCommandHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
const EntityVersionCreatedEvent_1 = require("../../../entity/domain/events/EntityVersionCreatedEvent");
class CreateEntityVersionCommandHandler {
    entityRepository;
    entityVersionService;
    auditRepository;
    eventBus;
    constructor(entityRepository, entityVersionService, auditRepository, eventBus) {
        this.entityRepository = entityRepository;
        this.entityVersionService = entityVersionService;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const { entityId, userId } = command;
        const id = EntityId_1.EntityId.create(entityId);
        const entity = await this.entityRepository.findById(id);
        if (!entity) {
            throw new Error(`Entity with ID ${entityId} not found.`);
        }
        const version = await this.entityVersionService.createVersion(entity);
        // Publish domain events
        await this.eventBus.publish(new EntityVersionCreatedEvent_1.EntityVersionCreatedEvent(version));
        // Audit logging
        await this.auditRepository.log({
            user: userId,
            action: 'CREATE_ENTITY_VERSION',
            resource: `entity:${entityId}:version:${version.id}`,
            status: 'SUCCESS'
        });
    }
}
exports.CreateEntityVersionCommandHandler = CreateEntityVersionCommandHandler;
//# sourceMappingURL=CreateEntityVersionCommandHandler.js.map