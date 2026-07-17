import { inject, injectable } from 'inversify';
import { RecordAuditCommand } from '../commands/RecordAuditCommand';
import { AuditRecordingService } from '../../domain/services/AuditRecordingService';
import { AuditEntry } from '../../domain/aggregates/AuditEntry';
import { AuditActor } from '../../domain/entities/AuditActor';
import { AuditResource } from '../../domain/entities/AuditResource';
import { AuditMetadata } from '../../domain/entities/AuditMetadata';
import { AuditId, CorrelationId, Timestamp, UserId, IPAddress, UserAgent, ResourceId } from '../../domain/value-objects/AuditValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@injectable()
export class RecordAuditCommandHandler {
  constructor(
    @inject('AuditRecordingService') private readonly auditRecordingService: AuditRecordingService
  ) {}

  async execute(command: RecordAuditCommand): Promise<void> {
    const { data } = command;
    
    const auditEntry = AuditEntry.create({
      action: data.action,
      actor: AuditActor.create({
        userId: new UserId(data.actorId),
        actorType: data.actorType,
        ipAddress: new IPAddress(data.ipAddress),
        userAgent: new UserAgent(data.userAgent)
      }),
      resource: AuditResource.create({
        id: new ResourceId(data.resourceId),
        type: data.resourceType
      }),
      metadata: (data.metadata || []).map(m => AuditMetadata.create({
        key: m.key,
        value: m.value
      })),
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });

    await this.auditRecordingService.record(auditEntry);
  }
}
