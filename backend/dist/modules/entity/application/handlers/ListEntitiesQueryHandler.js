"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEntitiesQueryHandler = void 0;
class ListEntitiesQueryHandler {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async handle(query) {
        return await this.entityRepository.findAll(query.page, query.limit);
    }
}
exports.ListEntitiesQueryHandler = ListEntitiesQueryHandler;
//# sourceMappingURL=ListEntitiesQueryHandler.js.map