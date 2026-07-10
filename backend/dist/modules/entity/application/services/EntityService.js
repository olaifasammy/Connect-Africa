"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
class EntityService {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async findById(id) {
        return await this.entityRepository.findById(EntityId_1.EntityId.create(id));
    }
    async save(entity) {
        await this.entityRepository.save(entity);
    }
}
exports.EntityService = EntityService;
//# sourceMappingURL=EntityService.js.map