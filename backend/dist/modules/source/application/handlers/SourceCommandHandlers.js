"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSourceHandler = exports.UpdateSourceHandler = void 0;
class UpdateSourceHandler {
    repository;
    auditLogger;
    constructor(repository, auditLogger) {
        this.repository = repository;
        this.auditLogger = auditLogger;
    }
    async handle(command) {
        const source = await this.repository.findById(command.sourceId);
        if (!source)
            throw new Error('Source not found');
        // TODO: Update source properties
        await this.repository.save(source);
        await this.auditLogger.log('SOURCE_UPDATED', { sourceId: command.sourceId.toString() });
    }
}
exports.UpdateSourceHandler = UpdateSourceHandler;
class DeleteSourceHandler {
    repository;
    auditLogger;
    constructor(repository, auditLogger) {
        this.repository = repository;
        this.auditLogger = auditLogger;
    }
    async handle(command) {
        await this.repository.delete(command.sourceId);
        await this.auditLogger.log('SOURCE_DELETED', { sourceId: command.sourceId.toString() });
    }
}
exports.DeleteSourceHandler = DeleteSourceHandler;
//# sourceMappingURL=SourceCommandHandlers.js.map