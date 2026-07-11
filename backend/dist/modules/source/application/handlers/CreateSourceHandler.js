"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSourceHandler = void 0;
const Source_1 = require("../../domain/entities/Source");
class CreateSourceHandler {
    repository;
    auditLogger;
    constructor(repository, auditLogger) {
        this.repository = repository;
        this.auditLogger = auditLogger;
    }
    async handle(command) {
        const source = Source_1.Source.create({
            title: command.title,
            type: command.type,
            provenance: command.provenance,
            createdAt: new Date()
        });
        await this.repository.save(source);
        await this.auditLogger.log('SOURCE_CREATED', { sourceId: source.id.toString(), title: source.title });
        return source.id.toString();
    }
}
exports.CreateSourceHandler = CreateSourceHandler;
//# sourceMappingURL=CreateSourceHandler.js.map