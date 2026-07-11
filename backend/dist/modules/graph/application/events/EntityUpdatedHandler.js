"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityUpdatedHandler = void 0;
class EntityUpdatedHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(event) {
        await this.repository.updateNode(event.entity.entityId.toString(), event.entity.metadata.getProps());
    }
}
exports.EntityUpdatedHandler = EntityUpdatedHandler;
//# sourceMappingURL=EntityUpdatedHandler.js.map