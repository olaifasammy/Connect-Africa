"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSourceHandler = exports.UpdateSourceHandler = void 0;
class UpdateSourceHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const source = await this.repository.findById(command.sourceId);
        if (!source)
            throw new Error('Source not found');
        await this.repository.save(source);
    }
}
exports.UpdateSourceHandler = UpdateSourceHandler;
class DeleteSourceHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        await this.repository.delete(command.sourceId);
    }
}
exports.DeleteSourceHandler = DeleteSourceHandler;
//# sourceMappingURL=UpdateSourceHandler.js.map