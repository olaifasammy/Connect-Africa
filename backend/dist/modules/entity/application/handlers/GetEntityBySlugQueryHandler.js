"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEntityBySlugQueryHandler = void 0;
class GetEntityBySlugQueryHandler {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async handle(query) {
        return await this.entityRepository.findBySlug(query.slug);
    }
}
exports.GetEntityBySlugQueryHandler = GetEntityBySlugQueryHandler;
//# sourceMappingURL=GetEntityBySlugQueryHandler.js.map