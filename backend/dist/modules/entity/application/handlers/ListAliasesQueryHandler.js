"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAliasesQueryHandler = void 0;
const EntityId_1 = require("../../../entity/domain/value-objects/EntityId");
class ListAliasesQueryHandler {
    entityAliasRepository;
    constructor(entityAliasRepository) {
        this.entityAliasRepository = entityAliasRepository;
    }
    async handle(query) {
        return await this.entityAliasRepository.findByEntityId(EntityId_1.EntityId.create(query.entityId));
    }
}
exports.ListAliasesQueryHandler = ListAliasesQueryHandler;
//# sourceMappingURL=ListAliasesQueryHandler.js.map