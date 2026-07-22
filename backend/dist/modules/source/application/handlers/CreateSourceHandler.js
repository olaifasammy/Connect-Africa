"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSourceHandler = void 0;
const Source_1 = require("../../domain/entities/Source");
const public_1 = require("../../../audit/public");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class CreateSourceHandler {
    repository;
    auditRepository;
    constructor(repository, auditRepository) {
        this.repository = repository;
        this.auditRepository = auditRepository;
    }
    async handle(command) {
        const source = Source_1.Source.create({
            title: command.title,
            type: command.type,
            provenance: command.provenance,
            createdAt: new Date()
        });
        await this.repository.save(source);
        const auditEntry = public_1.AuditEntry.create({
            action: 'CREATE_SOURCE',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId(source.id.toString()),
                type: 'SOURCE'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
        return source.id.toString();
    }
}
exports.CreateSourceHandler = CreateSourceHandler;
//# sourceMappingURL=CreateSourceHandler.js.map