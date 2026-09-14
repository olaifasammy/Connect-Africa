import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { UpdateSourceCommand, DeleteSourceCommand } from '../commands/SourceCommands';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

@provide(UpdateSourceHandler, true)
@injectable()
export class UpdateSourceHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: UpdateSourceCommand): Promise<void> {
    const source = await this.repository.findById(command.sourceId);

    if (!source) {
      throw new Error('Source not found');
    }

    source.update(command.title, command.provenance);
    await this.repository.save(source);

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_SOURCE',
        actorId: 'unknown',
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: command.sourceId.toString(),
        resourceType: 'SOURCE',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      })
    );
  }
}

@provide(DeleteSourceHandler, true)
@injectable()
export class DeleteSourceHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: DeleteSourceCommand): Promise<void> {
    await this.repository.delete(command.sourceId);

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'DELETE_SOURCE',
        actorId: 'unknown',
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: command.sourceId.toString(),
        resourceType: 'SOURCE',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      })
    );
  }
}
