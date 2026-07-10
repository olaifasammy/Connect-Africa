"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEntityByIdentifierQueryHandler = void 0;
class GetEntityByIdentifierQueryHandler {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async handle(query) {
        return await this.entityRepository.findByIdentifier(query.identifier);
    }
}
exports.GetEntityByIdentifierQueryHandler = GetEntityByIdentifierQueryHandler;
//# sourceMappingURL=GetEntityByIdentifierQueryHandler.js.map