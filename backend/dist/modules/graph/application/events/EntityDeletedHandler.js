"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityDeletedHandler = void 0;
class EntityDeletedHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(event) {
        await this.repository.deleteNode(event.entityId.value);
    }
}
exports.EntityDeletedHandler = EntityDeletedHandler;
//# sourceMappingURL=EntityDeletedHandler.js.map