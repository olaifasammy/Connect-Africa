"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEntityVersionQueryHandler = void 0;
class GetEntityVersionQueryHandler {
    entityVersionRepository;
    constructor(entityVersionRepository) {
        this.entityVersionRepository = entityVersionRepository;
    }
    async handle(query) {
        return await this.entityVersionRepository.findById(query.versionId);
    }
}
exports.GetEntityVersionQueryHandler = GetEntityVersionQueryHandler;
//# sourceMappingURL=GetEntityVersionQueryHandler.js.map