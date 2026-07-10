"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEntityTypesQueryHandler = void 0;
class ListEntityTypesQueryHandler {
    entityTypeRepository;
    constructor(entityTypeRepository) {
        this.entityTypeRepository = entityTypeRepository;
    }
    async handle(query) {
        // Assuming repository needs extension to support findByOntologyId
        return [];
    }
}
exports.ListEntityTypesQueryHandler = ListEntityTypesQueryHandler;
//# sourceMappingURL=ListEntityTypesQueryHandler.js.map