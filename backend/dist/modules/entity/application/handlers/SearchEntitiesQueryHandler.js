"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchEntitiesQueryHandler = void 0;
class SearchEntitiesQueryHandler {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async handle(query) {
        return await this.entityRepository.search(query.term);
    }
}
exports.SearchEntitiesQueryHandler = SearchEntitiesQueryHandler;
//# sourceMappingURL=SearchEntitiesQueryHandler.js.map