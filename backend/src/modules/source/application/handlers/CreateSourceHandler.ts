import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { CreateSourceCommand } from '../commands/CreateSourceCommand';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

@provide(CreateSourceHandler, true)
@injectable()
export class CreateSourceHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateSourceCommand): Promise<string> {
    const source = Source.create({
      title: command.title,
      type: command.type,
      provenance: command.provenance,
      createdAt: new Date()
    });

    await this.repository.save(source);

    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
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
