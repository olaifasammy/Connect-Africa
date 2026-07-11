"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNodeHandler = void 0;
class GetNodeHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(query) {
        return await this.repository.findById(query.entityId);
    }
}
exports.GetNodeHandler = GetNodeHandler;
//# sourceMappingURL=GetNodeHandler.js.map