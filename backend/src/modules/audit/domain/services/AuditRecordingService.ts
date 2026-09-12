import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditEntry } from '../aggregates/AuditEntry';
import { AuditRecordedEvent } from '../events/AuditRecordedEvent';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SensitiveDataMaskingPolicy } from '../policies/SensitiveDataMaskingPolicy';
import { AuditMetadata } from '../entities/AuditMetadata';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditId } from '../value-objects/AuditValueObjects';

@provide(AuditRecordingService, true)
@injectable()
export class AuditRecordingService {
  constructor(
    @inject('IAuditRepository') private readonly auditRepository: IAuditRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async record(auditEntry: AuditEntry): Promise<AuditId> {
    // Apply masking policy to metadata
    const maskedMetadata = auditEntry.metadata.map(meta => {
        const maskedValue = SensitiveDataMaskingPolicy.mask({ [meta.key]: meta.value });
        return AuditMetadata.create({ key: meta.key, value: maskedValue[meta.key] }, new UniqueEntityId(meta.id.toString()));
    });
    
    // Create a new entry with masked metadata
    const maskedEntry = AuditEntry.create({
        action: auditEntry.action,
        actor: auditEntry.actor,
        resource: auditEntry.resource,
        metadata: maskedMetadata,
        correlationId: auditEntry.correlationId,
        timestamp: auditEntry.timestamp
    }, auditEntry.id);
    
    await this.auditRepository.log(maskedEntry);
    
    // Publish the domain event
    await this.eventBus.publish(new AuditRecordedEvent(maskedEntry));
    
    return maskedEntry.id;
  }
}
