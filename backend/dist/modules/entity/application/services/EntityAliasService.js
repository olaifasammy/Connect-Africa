"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAliasService = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
class EntityAliasService {
    aliasRepository;
    constructor(aliasRepository) {
        this.aliasRepository = aliasRepository;
    }
    async findByEntityId(entityId) {
        return await this.aliasRepository.findByEntityId(EntityId_1.EntityId.create(entityId));
    }
}
exports.EntityAliasService = EntityAliasService;
//# sourceMappingURL=EntityAliasService.js.map