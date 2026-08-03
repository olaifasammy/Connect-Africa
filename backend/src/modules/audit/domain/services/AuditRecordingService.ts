import { inject, injectable } from 'inversify';
import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditEntry } from '../aggregates/AuditEntry';
import { AuditRecordedEvent } from '../events/AuditRecordedEvent';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

@injectable()
export class AuditRecordingService {
  constructor(
    @inject('IAuditRepository') private readonly auditRepository: IAuditRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async record(auditEntry: AuditEntry): Promise<void> {
    await this.auditRepository.log(auditEntry);
    
    // Publish the domain event
    await this.eventBus.publish(new AuditRecordedEvent(auditEntry));
  }
}
