import { inject } from 'inversify';
import { UpdateSourceCommand, DeleteSourceCommand } from '../commands/SourceCommands';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

export class UpdateSourceHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateSourceCommand): Promise<void> {
    const source = await this.repository.findById(command.sourceId);
    if (!source) throw new Error('Source not found');
    
    source.update(command.title, command.provenance);
    await this.repository.save(source);
    
    await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPDATE_SOURCE',
        actorId: 'unknown', // Need to pass userId in command if available
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: command.sourceId.toString(),
        resourceType: 'SOURCE',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}

export class DeleteSourceHandler {
  constructor(
    private readonly repository: ISourceRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: DeleteSourceCommand): Promise<void> {
    await this.repository.delete(command.sourceId);
    
    await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'DELETE_SOURCE',
        actorId: 'unknown',
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: command.sourceId.toString(),
        resourceType: 'SOURCE',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
