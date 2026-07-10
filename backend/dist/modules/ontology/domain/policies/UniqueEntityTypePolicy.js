"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityTypePolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class UniqueEntityTypePolicy {
    entityTypeRepository;
    constructor(entityTypeRepository) {
        this.entityTypeRepository = entityTypeRepository;
    }
    async validate(name) {
        const entityType = await this.entityTypeRepository.findByName(name);
        if (entityType) {
            throw new DomainError_1.DomainError(`Entity type with name '${name}' already exists.`);
        }
    }
}
exports.UniqueEntityTypePolicy = UniqueEntityTypePolicy;
//# sourceMappingURL=UniqueEntityTypePolicy.js.map