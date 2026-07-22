"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSourceHandler = void 0;
const Source_1 = require("../../domain/entities/Source");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class CreateSourceHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const source = Source_1.Source.create({
            title: command.title,
            type: command.type,
            provenance: command.provenance,
            createdAt: new Date()
        });
        await this.repository.save(source);
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'CREATE_SOURCE',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: source.id.toString(),
            resourceType: 'SOURCE',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
        return source.id.toString();
    }
}
exports.CreateSourceHandler = CreateSourceHandler;
//# sourceMappingURL=CreateSourceHandler.js.map