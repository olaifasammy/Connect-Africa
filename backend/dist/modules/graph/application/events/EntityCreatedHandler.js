"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCreatedHandler = void 0;
const GraphEntities_1 = require("../../domain/entities/GraphEntities");
class EntityCreatedHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(event) {
        const existingNode = await this.repository.findById(event.entity.id.toString());
        if (!existingNode) {
            const node = new GraphEntities_1.GraphNode(event.entity.id.toString(), event.entity.type, [], {});
            await this.repository.saveNode(node);
        }
    }
}
exports.EntityCreatedHandler = EntityCreatedHandler;
//# sourceMappingURL=EntityCreatedHandler.js.map