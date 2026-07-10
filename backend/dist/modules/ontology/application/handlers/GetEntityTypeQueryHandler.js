"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEntityTypeQueryHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class GetEntityTypeQueryHandler {
    entityTypeRepository;
    constructor(entityTypeRepository) {
        this.entityTypeRepository = entityTypeRepository;
    }
    async handle(query) {
        const entityType = await this.entityTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(query.id));
        if (!entityType) {
            throw new Error('Entity Type not found');
        }
        return {
            id: entityType.id.toString(),
            name: entityType.name,
            description: entityType.description
        };
    }
}
exports.GetEntityTypeQueryHandler = GetEntityTypeQueryHandler;
//# sourceMappingURL=GetEntityTypeQueryHandler.js.map