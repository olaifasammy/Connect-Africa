"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEntityQueryHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
class GetEntityQueryHandler {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async handle(query) {
        const entity = await this.entityRepository.findById(EntityId_1.EntityId.create(query.entityId));
        if (!entity)
            throw new Error('Entity not found');
        return entity; // Should be mapped to a DTO
    }
}
exports.GetEntityQueryHandler = GetEntityQueryHandler;
//# sourceMappingURL=GetEntityQueryHandler.js.map